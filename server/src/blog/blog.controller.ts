import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { Article } from '../article/article.entity';
import { ArticleService } from '../article/article.service';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './create-blog.dto';
import { UpdateBlogDto } from './update-blog.dto';

@Controller('blogs')
@ApiUseTags('Blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService, private readonly articleService: ArticleService) {}

  @Get()
  @ApiOkResponse({ type: Blog, isArray: true })
  public async getAllBlogs(): Promise<Blog[]> {
    return this.blogService.getAllBlogs();
  }

  @Get(':id/articles/page/:page')
  @ApiOkResponse({ type: Article, isArray: true })
  public async getBlogArticlesPage(@Param('id') id: string, @Param('page') page: number = 1): Promise<Article[]> {
    return this.articleService.getBlogArticlesPage(id, page);
  }

  @Get(':id')
  @ApiOkResponse({ type: Article })
  public async getBlog(@Param('id') id: string): Promise<Blog> {
    return this.blogService.getBlog(id);
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

  @Post(':id/refresh')
  @ApiOkResponse({ type: Blog })
  public async refreshBlog(@Param('id') id: string): Promise<Blog> {
    return this.blogService.refreshBlog(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Blog })
  public async updateBlog(@Param('id') id: string, @Body() body: UpdateBlogDto): Promise<Blog> {
    return this.blogService.updateBlog(id, body);
  }

  @Delete(':id')
  @ApiNoContentResponse({})
  public async deleteBlog(@Param('id') id: string): Promise<void> {
    await this.blogService.deleteBlog(id);
  }
}
