import { axiosInstance } from '../common/axios';
import { Pagination } from '../common/pagination/Pagination';
import { Article } from './models/Article';

export async function fetchArticlesPage(page: number): Promise<Pagination<Article>> {
  return axiosInstance.get(`/articles/page/${page}`);
}

export async function fetchBlogArticlesPage(blogId: string, page: number): Promise<Pagination<Article>> {
  return axiosInstance.get(`/blogs/${blogId}/articles/page/${page}`);
}

export async function fetchCategoryArticlesPage(categoryId: string, page: number): Promise<Pagination<Article>> {
  return axiosInstance.get(`/categories/${categoryId}/articles/page/${page}`);
}

export async function fetchArticle(id: string): Promise<Article> {
  return axiosInstance.get(`/articles/${id}`);
}

export async function markArticleAsRead(id: string): Promise<void> {
  return axiosInstance.patch(`/articles/${id}/read`, {}, { headers: { 'X-BG-SYNC': 'yes' } });
}
