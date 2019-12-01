import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../article/article.entity';
import { Category } from '../category/category.entity';

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

  @Column({ nullable: true })
  @ApiModelProperty()
  categoryId: string | null;

  @ManyToOne(
    () => Category,
    category => category.blogs,
    { onDelete: 'SET NULL' },
  )
  category: Category;

  constructor(blog: Partial<Blog> = {}) {
    Object.assign(this, blog);
  }
}
