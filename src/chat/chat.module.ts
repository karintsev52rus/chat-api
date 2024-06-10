import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './entities/chat.entity';
import { UsersChats } from './entities/user-chat.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { Message } from 'src/message/entities/message.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Chat, UsersChats, User, Message]),
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
