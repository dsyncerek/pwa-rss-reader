import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  @InjectRepository(Article)
  private readonly articleRepository: Repository<Article>;

  public async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  public async getBlogArticles(slug: string): Promise<Article[]> {
    return this.articleRepository.find({ blog: { slug } });
  }

  public async getArticleBySlug(slug: string): Promise<Article> {
    return this.articleRepository.findOneOrFail({ slug });
  }
}
