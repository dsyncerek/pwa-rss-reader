import { createSelector } from 'reselect';
import { Category } from '../../category/models/Category';
import { categoriesSelector } from '../../category/redux/categorySelectors';
import { Dictionary } from '../../common/models/Dictionary';
import { RootState } from '../../store/reducers';
import { Blog } from '../models/Blog';

export const blogsSelector = createSelector<RootState, Dictionary<Blog>, Category[], Blog[]>(
  state => state.entityState.blogs,
  categoriesSelector,
  (blogs, categories) => {
    return Object.values(blogs)
      .map(blog => prepareBlog(blog, categories)!)
      .filter(Boolean);
  },
);

export const allBlogsLoadedSelector = createSelector<RootState, boolean, boolean>(
  state => state.blogState.allLoaded,
  allLoaded => allLoaded,
);

function prepareBlog(blog: Blog, categories: Category[]): Blog | undefined {
  const category = categories.find(category => category.id === blog.categoryId);

  if (!category) {
    // if category doesn't exist, skip blog
    return;
  }

  return { ...blog, category };
}
