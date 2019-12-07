import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  categoryId: string;
}
