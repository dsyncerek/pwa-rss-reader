import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Output } from 'rss-parser';
import { Repository } from 'typeorm';
import { Article } from '../article/article.entity';
import { generateSlug } from '../common/slug.util';
import { RssService } from '../rss/rss.service';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './create-blog.dto';

@Injectable()
export class BlogService {
  @InjectRepository(Blog)
  private readonly blogRepository: Repository<Blog>;

  constructor(private readonly rssService: RssService) {}

  public async getAllBlogs(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  public async refreshAllBlogs(): Promise<Blog[]> {
    const blogs = await this.getAllBlogs();

    for (const blog of blogs) {
      await this.refreshBlogBySlug(blog.slug);
    }

    return this.getAllBlogs();
  }

  public async getBlogBySlug(slug: string): Promise<Blog> {
    return this.blogRepository.findOneOrFail({ slug });
  }

  public async createBlog({ url }: CreateBlogDto): Promise<Blog> {
    const parsed = await this.rssService.parseBlogRssUrl(url);
    const blog = this.getBlogFromRssFeedOutput(parsed);
    await this.blogRepository.save(blog);
    return this.getBlogBySlug(blog.slug);
  }

  public async refreshBlogBySlug(slug: string): Promise<Blog> {
    const blog = await this.getBlogBySlug(slug);
    const parsed = await this.rssService.parseBlogRssUrl(blog.rss);
    const blogFromRssFeed = this.getBlogFromRssFeedOutput(parsed);
    const blogToSave = { ...blog, ...blogFromRssFeed };
    await this.blogRepository.save(blogToSave);
    return this.getBlogBySlug(blog.slug);
  }

  public async removeBlogBySlug(slug: string): Promise<void> {
    await this.blogRepository.delete({ slug });
  }

  private getBlogFromRssFeedOutput(output: Output): Blog {
    const articles: Article[] = output.items.map(item => {
      return new Article({
        title: item.title,
        slug: generateSlug(item.title),
        date: new Date(item.isoDate),
        link: item.link,
        summary: item.contentSnippet,
        content: item.content,
      });
    });

    const blog: Blog = new Blog({
      name: output.title,
      slug: generateSlug(output.title),
      link: output.link,
      rss: output.feedUrl,
      icon: 'xddd',
      articles,
    });

    return blog;
  }
}
