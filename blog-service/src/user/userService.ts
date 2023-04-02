import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/userEntity';
import { UserDto } from './dto/userDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(account) {
    return await this.userRepository.findOne(account);
  }

  // 注册
  async register(user: UserDto) {
    const { account } = user;
    const data = await this.userRepository.findOne({ where: { account } });
    if (data) {
      throw new HttpException({ message: '用户已存在', code: 400 }, 200);
    }
    // 必须先create才能进@BeforeInsert
    user = await this.userRepository.create(user);
    return await this.userRepository.save(user);
  }
}
