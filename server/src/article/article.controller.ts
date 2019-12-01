import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { Article } from './article.entity';
import { ArticleService } from './article.service';

@Controller('articles')
@ApiUseTags('Articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiOkResponse({ type: Article, isArray: true })
  public async getAllArticles(): Promise<Article[]> {
    return this.articleService.getAllArticles();
  }

  @Get('page/:page')
  @ApiOkResponse({ type: Article, isArray: true })
  public async getArticlesPage(@Param('page') page: number = 1): Promise<Article[]> {
    return this.articleService.getArticlesPage(page);
  }

  @Get(':id')
  @ApiOkResponse({ type: Article })
  public async getArticle(@Param('id') id: string): Promise<Article> {
    return this.articleService.getArticle(id);
  }
}
