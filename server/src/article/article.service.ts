import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  public async getArticlesPage(page: number): Promise<Article[]> {
    return this.articleRepository.find({
      take: this.pageSize,
      skip: (page - 1) * this.pageSize,
      order: { date: 'DESC' },
    });
  }

  public async getBlogArticlesPage(id: string, page: number): Promise<Article[]> {
    return this.articleRepository.find({
      where: { blog: { id } },
      take: this.pageSize,
      skip: (page - 1) * this.pageSize,
      order: { date: 'DESC' },
    });
  }

  public async getCategoryArticlesPage(id: string, page: number): Promise<Article[]> {
    // TODO
    return this.articleRepository.find({
      where: { blog: { category: { id } } },
      take: this.pageSize,
      skip: (page - 1) * this.pageSize,
      order: { date: 'DESC' },
    });
  }
}
