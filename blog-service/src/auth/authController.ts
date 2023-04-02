import {
  Controller,
  Body,
  Req,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { LoginUserDto } from './dto/loginUserDto';
import { LocalAuthGuard } from './localAuthGuard';
import { AuthService } from './authService';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '用户登录' })
  // @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginUserDto, @Req() req) {
    console.log(req.user, '---------------------------------');
    return this.authService.login(req.user);
  }
}
