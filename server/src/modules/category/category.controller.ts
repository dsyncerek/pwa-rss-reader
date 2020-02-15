import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Article } from '../article/article.entity';
import { ArticleService } from '../article/article.service';
import { PaginationDto } from '../../common/pagination.dto';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService, private readonly articleService: ArticleService) {}

  @Get(':id/articles/page/:page')
  public async getCategoryArticlesPage(
    @Param('id') id: string,
    @Param('page') page: number = 1,
  ): Promise<PaginationDto<Article>> {
    return this.articleService.getCategoryArticlesPage(id, +page);
  }

  @Get()
  public async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  public async getCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategory(id);
  }

  @Post()
  public async createCategory(@Body() body: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(body);
  }

  @Patch(':id')
  public async updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.updateCategory(id, body);
  }

  @Delete(':id')
  public async deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
