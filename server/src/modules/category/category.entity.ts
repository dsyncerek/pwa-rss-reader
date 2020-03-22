import { ApiHideProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Blog } from '../blog/blog.entity';

@Entity({ orderBy: { name: 'ASC' } })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  name: string;

  @OneToMany(() => Blog, blog => blog.category)
  @ApiHideProperty()
  blogs: Blog[];

  @CreateDateColumn()
  @ApiHideProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiHideProperty()
  updatedAt: Date;

  @VersionColumn()
  @ApiHideProperty()
  version: number;
}
