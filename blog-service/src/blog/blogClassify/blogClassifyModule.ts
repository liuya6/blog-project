import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogClassifyEntity } from './entities/blogClassifyEntity';

import { BlogClassifyController } from './blogClassifyController';
import { BlogClassifyService } from './blogClassifyService';

@Module({
  imports: [TypeOrmModule.forFeature([BlogClassifyEntity])],
  controllers: [BlogClassifyController],
  providers: [BlogClassifyService],
  exports: [BlogClassifyService],
})
export class BlogClassifyModule {}
