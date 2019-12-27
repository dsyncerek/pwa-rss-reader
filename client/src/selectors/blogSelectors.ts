import { createSelector } from 'reselect';
import { Blog } from '../models/Blog';
import { Category } from '../models/Category';
import { Dictionary } from '../models/Dictionary';
import { RootState } from '../reducers';
import { categoriesSelector } from './categorySelectors';

export const blogsSelector = createSelector<RootState, Dictionary<Blog>, Category[], Blog[]>(
  state => state.entityState.blogs,
  categoriesSelector,
  (blogs, categories) => Object.values(blogs).map(blog => prepareBlog(blog, categories)),
);

export const allBlogsLoadedSelector = createSelector<RootState, boolean, boolean>(
  state => state.blogState.allLoaded,
  allLoaded => allLoaded,
);

function prepareBlog(blog: Blog, categories: Category[]): Blog {
  const category = categories.find(category => category.id === blog.categoryId);
  return { ...blog, category };
}
