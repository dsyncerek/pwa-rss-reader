import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Output } from 'rss-parser';
import { Repository } from 'typeorm';
import { Article } from '../article/article.entity';
import { generateSlug } from '../common/slug.util';
import { RssService } from '../rss/rss.service';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './create-blog.dto';
import { UpdateBlogDto } from './update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
    private readonly rssService: RssService,
  ) {
    this.startRefreshingInterval();
  }

  public async getAllBlogs(): Promise<Blog[]> {
    return this.blogRepository.find({ order: { name: 'ASC' } });
  }

  public async getBlog(id: string): Promise<Blog> {
    return this.blogRepository.findOneOrFail(id);
  }

  public async deleteBlog(id: string): Promise<void> {
    await this.blogRepository.delete(id);
  }

  public async updateBlog(id: string, data: UpdateBlogDto): Promise<Blog> {
    await this.blogRepository.update(id, data);
    return this.getBlog(id);
  }

  public async refreshAllBlogs(): Promise<Blog[]> {
    const blogs = await this.getAllBlogs();

    for (const blog of blogs) {
      await this.refreshBlog(blog.id);
    }

    return this.getAllBlogs();
  }

  public async createBlog({ rss, categoryId }: CreateBlogDto): Promise<Blog> {
    const parsedBlog = await this.rssService.parseBlogRssUrl(rss);
    const blogFromRssFeed = this.getBlogFromRssFeedOutput(parsedBlog);
    const blogToInsert = { ...blogFromRssFeed, rss, categoryId };

    await this.blogRepository.save(blogToInsert);
    return this.getBlog(blogToInsert.id);
  }

  public async refreshBlog(id: string): Promise<Blog> {
    const oldBlog = await this.blogRepository.findOneOrFail(id, { relations: ['articles'] });
    const parsedBlog = await this.rssService.parseBlogRssUrl(oldBlog.rss);
    const blogFromRssFeed = this.getBlogFromRssFeedOutput(parsedBlog);
    const newArticles = blogFromRssFeed.articles.filter(a => !oldBlog.articles.find(b => b.slug === a.slug));
    const blogToSave = { ...oldBlog, ...blogFromRssFeed, articles: [...oldBlog.articles, ...newArticles] };

    await this.blogRepository.save(blogToSave);
    return this.getBlog(oldBlog.id);
  }

  private getBlogFromRssFeedOutput(output: Output): Blog {
    const articles: Article[] = output.items.map(item => {
      return new Article({
        title: item.title,
        slug: `${generateSlug(output.title)}-${generateSlug(item.title)}`,
        date: new Date(item.isoDate),
        link: item.link,
        summary: item.contentSnippet,
        content: item.content,
      });
    });

    return new Blog({
      name: output.title,
      slug: generateSlug(output.title),
      link: output.link,
      rss: output.feedUrl,
      icon: output?.image?.url,
      articles,
    });
  }

  private startRefreshingInterval(): void {
    this.refreshAllBlogs().catch();

    setInterval(() => {
      this.refreshAllBlogs().catch();
    }, +process.env.BLOGS_REFRESH_INTERVAL);
  }
}
