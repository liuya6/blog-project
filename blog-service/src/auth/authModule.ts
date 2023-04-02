import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './authService';
import { UserEntity } from '../user/entities/userEntity';
import { LocalStrategy } from './localStrategy';
import { JwtStrategy } from './jwtStrategy';
import { AuthController } from './authController';
import envConfig from '../../config';

const jwtModule = JwtModule.registerAsync({
  useFactory: () => {
    return {
      secret: envConfig.SECRET,
      signOptions: { expiresIn: '4h' },
    };
  },
});

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [jwtModule],
})
export class AuthModule {}
