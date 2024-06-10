import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { GetUserChatsDto } from './dto/get-user-chats.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('add')
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Post('get')
  findAll(@Body() getUserChatsDto: GetUserChatsDto) {
    const { user } = getUserChatsDto;
    return this.chatService.getUserChats(user);
  }
}
