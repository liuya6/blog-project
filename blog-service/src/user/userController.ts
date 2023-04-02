import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { UserEntity } from './entities/userEntity';
import { UserDto } from './dto/userDto';
import { UserService } from './userService';

@ApiTags('账号')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  // form-data接收方式
  @UseInterceptors(AnyFilesInterceptor())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: [UserEntity] })
  async register(@Body() createUserDto: UserDto) {
    return await this.userService.register(createUserDto);
  }
}
