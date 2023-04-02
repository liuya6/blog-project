import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 环境配置信息  (数据库配置)
import envConfig from '../config';

// 各模块
import { BlogModule } from './blog/blogList/blogModule';
import { BlogTagModule } from './blog/blogTag/blogTagModule';
import { BlogClassifyModule } from './blog/blogClassify/blogClassifyModule';
import { UserModule } from './user/userModule';
import { AuthModule } from './auth/authModule';

@Module({
  imports: [
    TypeOrmModule.forRoot(envConfig.DATABASE_CONFIG),
    BlogModule,
    BlogTagModule,
    BlogClassifyModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
