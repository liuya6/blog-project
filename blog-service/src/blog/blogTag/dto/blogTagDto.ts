import { ApiPropertyOptional } from '@nestjs/swagger';

export class BlogTagDto {
  @ApiPropertyOptional({ description: '' })
  readonly id: number;

  @ApiPropertyOptional({ description: '标签名称' })
  readonly name: string;

  @ApiPropertyOptional({ description: '备注信息' })
  readonly remark: string;

  @ApiPropertyOptional({ description: '创建时间' })
  readonly createTime: Date;

  @ApiPropertyOptional({ description: '更新时间' })
  readonly updateTime: Date;
}
