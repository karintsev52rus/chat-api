import { INTEGER } from 'sequelize';
import {
  Model,
  Table,
  Column,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Chat } from 'src/chat/entities/chat.entity';
import { UsersChats } from 'src/chat/entities/user-chat.entity';
import { Message } from 'src/message/entities/message.entity';

@Table({ tableName: 'users', updatedAt: false })
export class User extends Model {
  // id пользователя
  @Column({
    type: INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  // имя пользователя
  @Column({
    unique: true,
  })
  username: string;

  @BelongsToMany(() => Chat, { through: () => UsersChats })
  chats: Chat[];

  @HasMany(() => Message, 'author')
  messages: Message[];
}
