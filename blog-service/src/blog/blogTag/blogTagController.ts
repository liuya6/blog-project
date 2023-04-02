import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger'
import { BlogTagService } from './blogTagService';
import { BlogTagDto } from './dto/blogTagDto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('博文标签')
@Controller('blog/tag')
export class BlogTagController {
  constructor(private readonly blogClassifyService: BlogTagService) {}

  @Get('list')
  @ApiOperation({ summary: '标签列表' })
  get() {
    return this.blogClassifyService.getAllClassify();
  }

  @Post('add')
  @ApiOperation({ summary: '新增标签' })
  @ApiQuery({
    name: 'remark',
    description: '标签备注',
  })
  @ApiQuery({
    name: 'name',
    description: '标签名称',
    required: true,
  })
  add(@Body() post: BlogTagDto) {
    return this.blogClassifyService.add(post);
  }

  @Post('edit')
  @ApiOperation({ summary: '编辑标签' })
  @ApiQuery({
    name: 'remark',
    description: '标签备注',
  })
  @ApiQuery({
    name: 'name',
    description: '标签名称',
  })
  edit(@Body() post: BlogTagDto) {
    return this.blogClassifyService.edit(post);
  }

  @Post('delete')
  @ApiOperation({ summary: '删除标签' })
  @ApiQuery({
    name: 'ids',
    required: true,
    description: '标签id，多个用逗号分隔',
  })
  async delete(@Body() post: { ids: string }) {
    return await this.blogClassifyService.delete(post);
  }
}
