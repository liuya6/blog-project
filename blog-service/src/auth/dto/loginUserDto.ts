import { ApiProperty } from '@nestjs/swagger';
// 进行数据验证和转换
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: '账号' })
  @IsNotEmpty({ message: '账号不能为空' })
  readonly account: string;

  @ApiProperty({ description: '用户密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}
