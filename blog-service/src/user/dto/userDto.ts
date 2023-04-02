import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiPropertyOptional({ description: '' })
  readonly id: number;

  @ApiPropertyOptional({ description: '账号' })
  readonly account: string;

  @ApiPropertyOptional({ description: '密码' })
  readonly password: string;

  @ApiPropertyOptional({ description: '用户昵称' })
  readonly nickname: string;

  @ApiPropertyOptional({ description: '创建时间' })
  readonly createTime: Date;

  @ApiPropertyOptional({ description: '更新时间' })
  readonly updateTime: Date;
}
