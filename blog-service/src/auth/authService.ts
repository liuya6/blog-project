import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../user/entities/userEntity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  // 获取用户信息
  getUser(user: Partial<UserEntity>) {
    return this.userRepository.findOne({
      where: { id: user.id, username: user.account },
    });
  }

  // 用户登录
  async login(user: Partial<UserEntity>) {
    const token = this.createToken(user);
    return {
      userInfo: user,
      token,
    };
  }

  // 生成token
  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign({
      id: user.id,
      username: user.account,
    });
  }
}
