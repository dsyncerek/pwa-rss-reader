import { Blog, SaveBlog } from '../models/Blog';
import { axiosInstance } from './axiosInstance';

export async function fetchAllBlogs(): Promise<Blog[]> {
  return axiosInstance.get(`/blogs`);
}

export async function fetchBlog(id: string): Promise<Blog> {
  return axiosInstance.get(`/blogs/${id}`);
}

export async function createBlog(blog: SaveBlog): Promise<Blog> {
  return axiosInstance.post(`/blogs`, blog);
}

export async function updateBlog(blog: SaveBlog): Promise<Blog> {
  return axiosInstance.patch(`/blogs/${blog.id}`, blog);
}

export async function deleteBlog(id: string): Promise<void> {
  return axiosInstance.delete(`/blogs/${id}`);
}
