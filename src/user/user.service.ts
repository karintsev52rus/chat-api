import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}
  async create(createUserDto: CreateUserDto): Promise<number> {
    const { username } = createUserDto;

    const isExist = await this.userModel.findOne({ where: { username } });
    if (isExist) {
      throw new BadRequestException('пользователь с таким именем существует');
    }
    const newUser = await this.userModel.create({ username });
    return newUser.id;
  }

  async isUserExist(userId: number) {
    const user = await this.userModel.findByPk(userId);
    if (user) {
      return true;
    } else return false;
  }
}
