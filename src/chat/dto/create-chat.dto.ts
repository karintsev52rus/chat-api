import { IsNumber, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  name: string;

  @IsNumber({}, { each: true })
  users: number[];
}
