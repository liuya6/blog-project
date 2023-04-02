// ApiProperty:必传参数  ApiPropertyOptional:可传参数
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BlogListDto {
  @ApiPropertyOptional({ description: '' })
  readonly id: number;

  @ApiPropertyOptional({ description: '博文标题' })
  readonly title: string;

  @ApiPropertyOptional({ description: '博文内容' })
  readonly content: string;

  @ApiPropertyOptional({ description: '博文分类' })
  readonly classify: number;

  @ApiPropertyOptional({ description: '博文标签' })
  readonly tag: number;

  @ApiPropertyOptional({ description: '点赞数' })
  readonly like: number;

  @ApiPropertyOptional({ description: '阅读量' })
  readonly read: number;

  @ApiPropertyOptional({ description: '评论数' })
  readonly comment: number;

  @ApiPropertyOptional({ description: '创建时间' })
  readonly createTime: Date;

  @ApiPropertyOptional({ description: '更新时间' })
  readonly updateTime: Date;
}
