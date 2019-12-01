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
  @InjectRepository(Blog)
  private readonly blogRepository: Repository<Blog>;

  constructor(private readonly rssService: RssService) {}

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

  public async createBlog({ url }: CreateBlogDto): Promise<Blog> {
    // TODO
    const parsed = await this.rssService.parseBlogRssUrl(url);
    const blog = this.getBlogFromRssFeedOutput(parsed);
    await this.blogRepository.save(blog);
    return this.getBlog(blog.id);
  }

  public async refreshBlog(id: string): Promise<Blog> {
    // TODO
    const blog = await this.getBlog(id);
    const parsed = await this.rssService.parseBlogRssUrl(blog.rss);
    const blogFromRssFeed = this.getBlogFromRssFeedOutput(parsed);
    const blogToSave = { ...blog, ...blogFromRssFeed };
    await this.blogRepository.save(blogToSave);
    return this.getBlog(blog.id);
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

    const blog: Blog = new Blog({
      name: output.title,
      slug: generateSlug(output.title),
      link: output.link,
      rss: output.feedUrl,
      icon: output?.image?.url,
      articles,
    });

    return blog;
  }
}
