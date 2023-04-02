import { ApiPropertyOptional } from '@nestjs/swagger';

export class BlogClassifyDto {
  @ApiPropertyOptional({ description: '' })
  readonly id: number;

  @ApiPropertyOptional({ description: '分类名称' })
  readonly name: string;

  @ApiPropertyOptional({ description: '备注信息' })
  readonly remark: string;

  @ApiPropertyOptional({ description: '创建时间' })
  readonly createTime: Date;

  @ApiPropertyOptional({ description: '更新时间' })
  readonly updateTime: Date;
}
