import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatService } from 'src/chat/chat.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message) private readonly messageModel: typeof Message,
    @Inject(ChatService) private readonly chatService: ChatService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  async getChatMessages(chatId: number): Promise<Message[]> {
    const chatMessages = await this.messageModel.findAll({
      where: { chat: chatId },
      order: [['createdAt', 'ASC']],
    });
    return chatMessages;
  }

  async createMessage(creageMessageDto: CreateMessageDto): Promise<number> {
    const { author, chat, text } = creageMessageDto;

    const isChatExist = await this.chatService.isChatExist(chat);
    if (!isChatExist) {
      throw new BadRequestException(`чата с id ${chat} не существует`);
    }

    const isUserExist = await this.userService.isUserExist(author);
    if (!isUserExist) {
      throw new BadRequestException(
        `пользователя с id ${author} не существует`,
      );
    }

    const isAuthorInChat = await this.chatService.isUserInChat(chat, author);
    if (!isAuthorInChat) {
      throw new ForbiddenException(
        `Пользователь id ${author} не состоит в чате id ${chat}`,
      );
    }

    const message = await this.messageModel.create({ author, chat, text });
    return message.id;
  }
}
