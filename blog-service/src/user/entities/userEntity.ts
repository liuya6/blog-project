import {
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  Entity,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { hashSync } from 'bcryptjs';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', length: 12, comment: '账号' })
  account: string;

  @Exclude()
  @Column({ default: '', comment: '密码' })
  password: string;

  @Column({ default: '', comment: '用户昵称' })
  nickname: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    comment: '创建时间',
    name: 'create_time',
  })
  createTime: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    comment: '更新时间',
    name: 'update_time',
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    this.password = await hashSync(this.password, 10);
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updateTime = new Date();
  }
}
