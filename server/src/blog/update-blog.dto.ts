import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBlogDto {
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
