import { Controller, Get, Post, Body } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

import { BlogListService } from './blogListService';
import {
  // ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { BlogListDto } from './dto/blogListDto';

@ApiTags('博文相关')
@Controller('blog/list')
export class BlogListController {
  constructor(private readonly blogListService: BlogListService) {}

  @Get('')
  @ApiOperation({ summary: '获取博文列表' })
  async get(@Body() post: BlogListDto) {
    return await this.blogListService.getAllBlog(post);
  }

  @Post('add')
  @ApiOperation({ summary: '新增博文' })
  @ApiQuery({
    name: 'content',
    required: true,
    description: '博文内容',
  })
  @ApiQuery({
    name: 'title',
    required: true,
    description: '博文标题',
  })
  async create(@Body() post: BlogListDto) {
    return await this.blogListService.create(post);
  }

  // @Post('add')
  // @ApiOperation({ summary: '新增博文' })
  // @ApiBearerAuth() // swagger文档设置token
  // @UseGuards(AuthGuard('jwt'))
  // async create(@Body() post: BlogListDto) {
  //   return await this.blogListService.create(post);
  // }

  @Post('edit')
  @ApiOperation({ summary: '编辑博文' })
  @ApiQuery({
    name: 'id',
    required: true,
    description: '博文id',
  })
  @ApiQuery({
    name: 'content',
    required: true,
    description: '博文内容',
  })
  @ApiQuery({
    name: 'title',
    required: true,
    description: '博文标题',
  })
  async edit(@Body() post: BlogListDto) {
    return await this.blogListService.edit(post);
  }

  // @Post('getTree')
  // @ApiOperation({ summary: '获取组织机构树' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @ApiQuery({
  //   name: 'name',
  //   required: false,
  //   description: '组织机构名称',
  // })
  // async getTree(@Query('name') name: string): Promise<BlogListDto[]> {
  //   return await this.blogListService.getTree(name);
  // }

  @Post('delete')
  @ApiOperation({ summary: '删除博文' })
  @ApiQuery({
    name: 'ids',
    required: true,
    description: '博文id，多个用逗号分隔',
  })
  async delete(@Body() post: { ids: string }) {
    return await this.blogListService.delete(post);
  }
}
