import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entities/user.entity';
import { Chat } from './chat/entities/chat.entity';
import { Message } from './message/entities/message.entity';
import { UsersChats } from './chat/entities/user-chat.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    ChatModule,
    UserModule,
    MessageModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      models: [User, Chat, Message, UsersChats],
      define: {
        underscored: true,
      },
      autoLoadModels: true,
      sync: { alter: true },
    }),
  ],
})
export class AppModule {}
