import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../common/pagination.dto';
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
  public async getArticlesPage(@Param('page') page: number = 1): Promise<PaginationDto<Article>> {
    return this.articleService.getArticlesPage(+page);
  }

  @Get(':id')
  public async getArticle(@Param('id') id: string): Promise<Article> {
    return this.articleService.getArticle(id);
  }

  @Patch(':id/read')
  public async markArticleAsRead(@Param('id') id: string): Promise<void> {
    return this.articleService.markArticleAsRead(id);
  }
}
