import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from '../blog/blog.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiModelProperty()
  id: string;

  @Column()
  @Index({ unique: true })
  @ApiModelProperty()
  name: string;

  @OneToMany(
    () => Blog,
    blog => blog.category,
  )
  blogs: Blog[];
}
