import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from '../blog/blog.entity';

@Entity()
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
  @ApiHideProperty()
  blogs: Blog[];
}
