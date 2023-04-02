import { Body, Controller, Get, Post } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger'
import { BlogClassifyService } from './blogClassifyService';
import { BlogClassifyDto } from './dto/blogClassifyDto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('分类')
@Controller('blog/classify')
export class BlogClassifyController {
  constructor(private readonly blogClassifyService: BlogClassifyService) {}

  @Get('list')
  @ApiOperation({ summary: '分类列表' })
  get() {
    return this.blogClassifyService.getAllClassify();
  }

  @Post('add')
  @ApiOperation({ summary: '新增分类' })
  @ApiQuery({
    name: 'remark',
    description: '分类备注',
  })
  @ApiQuery({
    name: 'name',
    description: '分类名称',
    required: true,
  })
  add(@Body() post: BlogClassifyDto) {
    return this.blogClassifyService.add(post);
  }

  @Post('edit')
  @ApiOperation({ summary: '编辑分类' })
  @ApiQuery({
    name: 'remark',
    description: '分类备注信息',
  })
  @ApiQuery({
    name: 'name',
    description: '分类名称',
  })
  edit(@Body() post: BlogClassifyDto) {
    return this.blogClassifyService.edit(post);
  }

  @Post('delete')
  @ApiOperation({ summary: '删除分类' })
  @ApiQuery({
    name: 'ids',
    required: true,
    description: '分类id，多个用逗号分隔',
  })
  async delete(@Body() post: { ids: string }) {
    return await this.blogClassifyService.delete(post);
  }
}
