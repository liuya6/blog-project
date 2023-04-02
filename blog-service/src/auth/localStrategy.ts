import { HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcryptjs';
import { IStrategyOptions, Strategy } from 'passport-local';
import { UserEntity } from '../user/entities/userEntity';
import { Repository } from 'typeorm';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new HttpException({ message: '用户名不存在', code: 400 }, 200);
    }
    if (!compareSync(password, user.password)) {
      throw new HttpException({ message: '密码错误！', code: 400 }, 200);
    }
    return user;
  }
}
