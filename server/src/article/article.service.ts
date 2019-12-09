import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/pagination.dto';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  @InjectRepository(Article)
  private readonly articleRepository: Repository<Article>;

  private readonly pageSize: number = 5;

  public async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find({ order: { date: 'DESC' } });
  }

  public async getArticle(id: string): Promise<Article> {
    return this.articleRepository.findOneOrFail(id);
  }

  public async getArticlesPage(page: number): Promise<PaginationDto<Article>> {
    const [articles, total] = await this.articleRepository.findAndCount({
      take: this.pageSize,
      skip: (page - 1) * this.pageSize,
      order: { date: 'DESC' },
    });

    return new PaginationDto<Article>({
      items: articles,
      totalItems: total,
      currentPage: page,
      pageCount: Math.ceil(total / this.pageSize),
    });
  }

  public async getBlogArticlesPage(id: string, page: number): Promise<PaginationDto<Article>> {
    const [articles, total] = await this.articleRepository.findAndCount({
      where: { blog: { id } },
      take: this.pageSize,
      skip: (page - 1) * this.pageSize,
      order: { date: 'DESC' },
    });

    return new PaginationDto<Article>({
      items: articles,
      totalItems: total,
      currentPage: page,
      pageCount: Math.ceil(total / this.pageSize),
    });
  }

  public async getCategoryArticlesPage(id: string, page: number): Promise<PaginationDto<Article>> {
    const [articles, total] = await this.articleRepository.findAndCount({
      where: { blog: { category: { id } } }, // todo
      take: this.pageSize,
      skip: (page - 1) * this.pageSize,
      order: { date: 'DESC' },
    });

    return new PaginationDto<Article>({
      items: articles,
      totalItems: total,
      currentPage: page,
      pageCount: Math.ceil(total / this.pageSize),
    });
  }
}
