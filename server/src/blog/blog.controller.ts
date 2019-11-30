import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { Article } from '../article/article.entity';
import { ArticleService } from '../article/article.service';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './create-blog.dto';

@Controller('blogs')
@ApiUseTags('Blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService, private readonly articleService: ArticleService) {}

  @Get()
  @ApiOkResponse({ type: Blog, isArray: true })
  public async getAllBlogs(): Promise<Blog[]> {
    return this.blogService.getAllBlogs();
  }

  @Post()
  @ApiCreatedResponse({ type: Blog })
  public async createBlog(@Body() body: CreateBlogDto): Promise<Blog> {
    return this.blogService.createBlog(body);
  }

  @Post('refresh')
  @ApiOkResponse({ type: Blog, isArray: true })
  public async refreshAllBlogs(): Promise<Blog[]> {
    return this.blogService.refreshAllBlogs();
  }

  @Post(':slug/refresh')
  @ApiOkResponse({ type: Blog })
  public async refreshBlogBySlug(@Param('slug') slug: string): Promise<Blog> {
    return this.blogService.refreshBlogBySlug(slug);
  }

  @Get(':slug/articles')
  @ApiOkResponse({ type: Article, isArray: true })
  public async getBlogArticles(@Param('slug') slug: string): Promise<Article[]> {
    return this.articleService.getBlogArticles(slug);
  }

  @Get(':slug')
  @ApiOkResponse({ type: Article })
  public async getBlogBySlug(@Param('slug') slug: string): Promise<Blog> {
    return this.blogService.getBlogBySlug(slug);
  }

  @Delete(':slug')
  @ApiNoContentResponse({})
  public async deleteBlogBySlug(@Param('slug') slug: string): Promise<void> {
    await this.blogService.removeBlogBySlug(slug);
  }
}
