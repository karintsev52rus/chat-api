import { INTEGER } from 'sequelize';
import {
  Model,
  Table,
  Column,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { UsersChats } from './user-chat.entity';
import { Message } from 'src/message/entities/message.entity';

@Table({ tableName: 'chats', updatedAt: false })
export class Chat extends Model {
  // id чата
  @Column({
    type: INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  // имя чата
  @Column({
    unique: true,
  })
  name: string;

  @BelongsToMany(() => User, { through: () => UsersChats })
  users: User[];

  @HasMany(() => Message, 'chat')
  messages: Message[];
}
