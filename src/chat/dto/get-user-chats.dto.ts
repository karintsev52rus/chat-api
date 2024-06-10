import { IsNumber } from 'class-validator';

export class GetUserChatsDto {
  @IsNumber()
  user: number;
}
