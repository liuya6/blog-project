import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogTagEntity } from './entities/blogTagEntity';
import { BlogTagController } from './blogTagController';
import { BlogTagService } from './blogTagService';

@Module({
  imports: [TypeOrmModule.forFeature([BlogTagEntity])],
  controllers: [BlogTagController],
  providers: [BlogTagService],
  exports: [BlogTagService],
})
export class BlogTagModule {}
