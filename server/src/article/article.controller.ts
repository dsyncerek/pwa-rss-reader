import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Article } from './article.entity';
import { ArticleService } from './article.service';

@Controller('articles')
@ApiTags('Articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  public async getAllArticles(): Promise<Article[]> {
    return this.articleService.getAllArticles();
  }

  @Get('page/:page')
  public async getArticlesPage(@Param('page') page: number = 1): Promise<Article[]> {
    return this.articleService.getArticlesPage(page);
  }

  @Get(':id')
  public async getArticle(@Param('id') id: string): Promise<Article> {
    return this.articleService.getArticle(id);
  }
}
