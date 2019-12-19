import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/pagination.dto';
import { getPaginationResponse } from '../common/pagination.utils';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  @InjectRepository(Article)
  private readonly articleRepository: Repository<Article>;

  public async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  public async getArticle(id: string): Promise<Article> {
    return this.articleRepository.findOneOrFail(id);
  }

  public async getArticlesPage(page: number): Promise<PaginationDto<Article>> {
    const query = this.articleRepository.createQueryBuilder('article');

    return getPaginationResponse(query, page);
  }

  public async getBlogArticlesPage(id: string, page: number): Promise<PaginationDto<Article>> {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .leftJoin('article.blog', 'blog')
      .where('blog.id = :id', { id });

    return getPaginationResponse(query, page);
  }

  public async getCategoryArticlesPage(id: string, page: number): Promise<PaginationDto<Article>> {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .leftJoin('article.blog', 'blog')
      .leftJoin('blog.category', 'category')
      .where('category.id = :id', { id });

    return getPaginationResponse(query, page);
  }
}
