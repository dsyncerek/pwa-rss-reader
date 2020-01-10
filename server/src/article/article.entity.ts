import { ApiHideProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Blog } from '../blog/blog.entity';

@Entity({ orderBy: { date: 'DESC' } })
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  @Index({ unique: true })
  slug: string;

  @Column()
  date: Date;

  @Column()
  link: string;

  @Column()
  content: string;

  @Column({ default: false })
  read: boolean;

  @Column()
  blogId: string;

  @ManyToOne(
    () => Blog,
    blog => blog.articles,
    { nullable: false, onDelete: 'CASCADE' },
  )
  @ApiHideProperty()
  blog: Blog;

  @CreateDateColumn()
  @ApiHideProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiHideProperty()
  updatedAt: Date;

  @VersionColumn()
  @ApiHideProperty()
  version: number;

  constructor(article: Partial<Article> = {}) {
    Object.assign(this, article);
  }
}
