import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blog_classify')
export class BlogClassifyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', comment: '分类名称' })
  name: string;

  @Column({ default: '', comment: '分类备注' })
  remark: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    comment: '创建时间',
  })
  createTime: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    comment: '更新时间',
  })
  updateTime: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateTime = new Date();
  }
}
