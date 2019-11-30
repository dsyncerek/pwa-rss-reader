import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  @InjectRepository(Article)
  private readonly articleRepository: Repository<Article>;

  public async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find({});
  }

  public async getArticlesPage(page: number): Promise<Article[]> {
    const pageSize = 5;

    return this.articleRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { date: 'DESC' },
    });
  }

  public async getBlogArticles(slug: string): Promise<Article[]> {
    return this.articleRepository.find({ blog: { slug } });
  }

  public async getArticleBySlug(slug: string): Promise<Article> {
    return this.articleRepository.findOneOrFail({ slug });
  }
}
