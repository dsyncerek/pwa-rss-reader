import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from '../blog/blog.entity';

@Entity({ orderBy: { name: 'ASC' } })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  name: string;

  @OneToMany(
    () => Blog,
    blog => blog.category,
  )
  // @ApiHideProperty()
  blogs: Blog[];
}
