import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogListEntity } from './entities/blogListEntity';
import { BlogListController } from './blogListController';
import { BlogListService } from './blogListService';

@Module({
  imports: [TypeOrmModule.forFeature([BlogListEntity])],
  controllers: [BlogListController],
  providers: [BlogListService],
  exports: [BlogListService],
})
export class BlogModule {}
