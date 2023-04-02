import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BlogTagEntity } from './entities/blogTagEntity';

@Injectable()
export class BlogTagService {
  constructor(
    @InjectRepository(BlogTagEntity)
    private readonly blogClassifyRepository: Repository<BlogTagEntity>,
  ) {}

  // 获取分类列表
  async getAllClassify(): Promise<BlogTagEntity[]> {
    return await this.blogClassifyRepository.find();
  }

  // 新增分类
  async add(post: Partial<BlogTagEntity>) {
    const { id, name } = post;
    if (id) {
      throw new HttpException({ message: '新增不需要标签id', code: 400 }, 200);
    }
    if (!name) {
      throw new HttpException({ message: '请填写标签名称', code: 400 }, 200);
    }
    return await this.blogClassifyRepository.save(post);
  }

  // 编辑分类
  async edit(post: Partial<BlogTagEntity>) {
    const { id } = post;
    if (!id) {
      throw new HttpException({ message: '编辑需要标签id', code: 400 }, 200);
    }
    const existPost = await this.blogClassifyRepository.findOne(Number(id));
    if (!existPost) {
      throw new HttpException(
        { message: `id为${id}的标签不存在`, code: 400 },
        200,
      );
    }
    delete post.id;
    const updatePost = this.blogClassifyRepository.merge(existPost, post);
    return this.blogClassifyRepository.save(updatePost);
  }

  // 删除分类
  async delete(post: { ids: string }) {
    const { ids } = post;
    if (!ids) {
      throw new HttpException({ message: `ids为空`, code: 400 }, 400);
    }
    const posts = await this.blogClassifyRepository.findByIds(
      ids?.split(',') || [],
    );
    if (!posts || !posts.length) {
      throw new HttpException(
        { message: `id为${ids?.split(',')}的标签不存在`, code: 400 },
        400,
      );
    }
    posts.map((item) => {
      this.blogClassifyRepository.remove(item);
    });
    return '删除成功';
  }
}
