import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blog_list')
export class BlogListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, default: '', comment: '博文标题' })
  title: string;

  @Column({ default: '', comment: '博文内容' })
  content: string;

  @Column({ default: 0, comment: '博文分类' })
  classify: number;

  @Column({ default: 0, comment: '博文标签' })
  tag: number;

  @Column({ default: 0, comment: '博文点赞数' })
  like: number;

  @Column({ default: 0, comment: '博文阅读数' })
  read: number;

  @Column({ default: 0, comment: '博文评论数' })
  comment: number;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateTime = new Date();
  }
}
