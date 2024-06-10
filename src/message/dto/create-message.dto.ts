import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  chat: number;

  @IsNumber()
  author: number;

  @IsString()
  text: string;
}
