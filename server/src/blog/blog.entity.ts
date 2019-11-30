import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../article/article.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  @ApiModelProperty()
  id: string;

  @Column()
  @ApiModelProperty()
  name: string;

  @Column()
  @Index({ unique: true })
  @ApiModelProperty()
  slug: string;

  @Column()
  @ApiModelProperty()
  link: string;

  @Column()
  @ApiModelProperty()
  rss: string;

  @Column({ default: '' })
  @ApiModelProperty()
  icon: string;

  @OneToMany(
    () => Article,
    article => article.blog,
    { cascade: true },
  )
  articles: Article[];

  constructor(blog: Partial<Blog> = {}) {
    Object.assign(this, blog);
  }
}
