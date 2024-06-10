import { IsNumber } from 'class-validator';

export class GetChatMessagesDto {
  @IsNumber()
  chat: number;
}
