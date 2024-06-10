import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './entities/chat.entity';
import { UsersChats } from './entities/user-chat.entity';
import { User } from 'src/user/entities/user.entity';
import { Op, Sequelize } from 'sequelize';
import { UserService } from 'src/user/user.service';
import { Message } from 'src/message/entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat) private readonly chatModel: typeof Chat,
    @InjectModel(UsersChats) private readonly userChats: typeof UsersChats,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Message) private readonly messageModel: typeof Message,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  async create(createChatDto: CreateChatDto): Promise<number> {
    const { name, users } = createChatDto;
    const isChatExist = await this.chatModel.findOne({ where: { name } });
    if (isChatExist) {
      throw new BadRequestException('чат с таким названием уже существует');
    }

    if (users.length) {
      for (const id of users) {
        const isUserExist = await this.userModel.findOne({ where: { id } });
        if (!isUserExist) {
          throw new BadRequestException(
            `массив users содержит id несушествующего пользователя ${id}`,
          );
        }
      }
    }

    const newChat = await this.chatModel.create({ name, users });
    await newChat.$set('users', users);
    return newChat.id;
  }

  async getUserChats(userId: number): Promise<Chat[]> {
    const isUserExists = await this.userService.isUserExist(userId);
    if (!isUserExists) {
      throw new NotFoundException(`Пользователя с id ${userId} не существует`);
    }

    const userChats = await this.userChats.findAll({
      where: { userId },
    });

    const chatsIds = userChats.map((userChat) => {
      return userChat.chatId;
    });

    const chats = await this.getChats(chatsIds);
    return chats;
  }

  async isChatExist(chatId: number): Promise<boolean> {
    const chat = await this.chatModel.findOne({ where: { id: chatId } });
    if (chat) {
      return true;
    } else return false;
  }

  async isUserInChat(chatId: number, userId: number): Promise<boolean> {
    const usersInChat = await this.userChats.findAll({
      where: { chatId },
      attributes: ['userId'],
    });

    const users = usersInChat.map((userChats) => {
      return userChats.userId;
    });

    if (!users.includes(userId)) {
      return false;
    } else return true;
  }

  async getChats(chatsIds: number[]): Promise<Chat[]> {
    if (!chatsIds.length) {
      return [];
    }

    const chats = await this.chatModel.findAll({
      where: { id: { [Op.in]: chatsIds } },
      include: { model: Message, as: 'messages' },
      group: ['Chat.id', 'messages.id'],
      order: [
        [Sequelize.fn('max', Sequelize.col('messages.created_at')), 'DESC'],
      ],
    });
    return chats;
  }
}
