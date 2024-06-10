import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<number> {
    return this.userService.create(createUserDto);
  }
}
