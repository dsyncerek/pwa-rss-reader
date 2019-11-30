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
  public async getArticles(): Promise<Article[]> {
    return this.articleService.getAllArticles();
  }

  @Get(':slug')
  @ApiOkResponse({ type: Article })
  public async getArticleBySlug(@Param('slug') slug: string): Promise<Article> {
    return this.articleService.getArticleBySlug(slug);
  }
}
