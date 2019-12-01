import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { Article } from '../article/article.entity';
import { ArticleService } from '../article/article.service';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';

@Controller('categories')
@ApiUseTags('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService, private readonly articleService: ArticleService) {}

  @Get(':id/articles/page/:page')
  @ApiOkResponse({ type: Article, isArray: true })
  public async getCategoryArticlesPage(@Param('id') id: string, @Param('page') page: number = 1): Promise<Article[]> {
    return this.articleService.getCategoryArticlesPage(id, page);
  }

  @Get()
  @ApiOkResponse({ type: Category, isArray: true })
  public async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  @ApiOkResponse({ type: Category })
  public async getCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategory(id);
  }

  @Post()
  @ApiCreatedResponse({ type: Category })
  public async createCategory(@Body() body: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(body);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Category })
  public async updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.updateCategory(id, body);
  }

  @Delete(':id')
  @ApiNoContentResponse({})
  public async deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
