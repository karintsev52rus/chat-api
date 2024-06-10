import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { GetChatMessagesDto } from './dto/get-chat-messages.dto';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('get')
  findAll(@Body() getChatMessagesDto: GetChatMessagesDto): Promise<Message[]> {
    const { chat } = getChatMessagesDto;
    return this.messageService.getChatMessages(chat);
  }

  @Post('add')
  create(@Body() createMessageDto: CreateMessageDto): Promise<number> {
    return this.messageService.createMessage(createMessageDto);
  }
}
