import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from '../blog/blog.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  @ApiModelProperty()
  id: string;

  @Column()
  @ApiModelProperty()
  title: string;

  @Column()
  @Index({ unique: true })
  @ApiModelProperty()
  slug: string;

  @Column()
  @ApiModelProperty()
  date: Date;

  @Column()
  @ApiModelProperty()
  link: string;

  @Column()
  @ApiModelProperty()
  summary: string;

  @Column()
  @ApiModelProperty()
  content: string;

  @Column()
  @ApiModelProperty()
  blogId: string;

  @ManyToOne(
    () => Blog,
    blog => blog.articles,
    { nullable: false, onDelete: 'CASCADE' },
  )
  blog: Blog;

  constructor(article: Partial<Article> = {}) {
    Object.assign(this, article);
  }
}
