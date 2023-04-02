import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { listToTree } from 'src/utils/utils';
// import { BlogListDto } from './dto/blogListDto';
import { BlogListEntity } from './entities/blogListEntity';

@Injectable()
export class BlogListService {
  constructor(
    @InjectRepository(BlogListEntity)
    private readonly blogListRepository: Repository<BlogListEntity>,
  ) {}

  // 博文列表
  async getAllBlog(post: Partial<BlogListEntity>): Promise<BlogListEntity[]> {
    return await this.blogListRepository.find();
  }

  // 新增博文
  async create(post: Partial<BlogListEntity>): Promise<BlogListEntity> {
    const { id } = post;
    if (id) {
      throw new HttpException({ message: '新增不需要博文id', code: 400 }, 200);
    }
    delete post.id;
    return await this.blogListRepository.save(post);
  }

  // 编辑博文
  async edit(post: Partial<BlogListEntity>): Promise<BlogListEntity> {
    const { id, title, content } = post;
    if (!id) {
      throw new HttpException({ message: '博文ID不能为空', code: 400 }, 200);
    }
    if (!title || !content) {
      throw new HttpException(
        { message: '博文标题或博文内容为必填', code: 400 },
        200,
      );
    }

    const existPost = await this.blogListRepository.findOne(Number(id));
    if (!existPost) {
      throw new HttpException(
        { message: `id为${id}的博文不存在`, code: 400 },
        200,
      );
    }
    delete post.id;
    const updatePost = this.blogListRepository.merge(existPost, post);
    return this.blogListRepository.save(updatePost);
  }

  // 删除博文
  async delete(post: { ids: string }) {
    const { ids } = post;
    if (!ids) {
      throw new HttpException({ message: `ids为空`, code: 400 }, 400);
    }
    const posts = await this.blogListRepository.findByIds(
      ids?.split(',') || [],
    );
    if (!posts || !posts.length) {
      throw new HttpException(
        { message: `id为${ids?.split(',')}的博文不存在`, code: 400 },
        400,
      );
    }
    posts.map((item) => {
      this.blogListRepository.remove(item);
    });
    return '删除成功';
  }
}
