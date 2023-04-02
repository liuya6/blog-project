import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blog_tag')
export class BlogTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', comment: '标签名称' })
  name: string;

  @Column({ default: '', comment: '标签备注' })
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
