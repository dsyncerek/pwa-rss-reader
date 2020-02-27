import { axiosInstance } from '../../core/axios';
import { Category, SaveCategory } from './models/Category';

export async function fetchAllCategories(): Promise<Category[]> {
  return axiosInstance.get(`/categories`);
}

export async function createCategory(category: SaveCategory): Promise<Category> {
  return axiosInstance.post(`/categories`, category);
}

export async function updateCategory(category: SaveCategory): Promise<Category> {
  return axiosInstance.patch(`/categories/${category.id}`, category);
}

export async function deleteCategory(id: string): Promise<void> {
  return axiosInstance.delete(`/categories/${id}`);
}
