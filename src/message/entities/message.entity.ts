import { INTEGER } from 'sequelize';
import {
  Model,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Chat } from 'src/chat/entities/chat.entity';
import { User } from 'src/user/entities/user.entity';

@Table({ tableName: 'messages', updatedAt: false })
export class Message extends Model {
  // id сообщения
  @Column({
    type: INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  // ссылка на чат
  @ForeignKey(() => Chat)
  @Column
  chat: number;

  @BelongsTo(() => Chat, 'chat')
  chatInfo: Chat;

  // ссылка на пользователя
  @ForeignKey(() => User)
  @Column
  author: number;

  @BelongsTo(() => User, 'author')
  user: User;

  // текст сообщения
  @Column
  text: string;
}
