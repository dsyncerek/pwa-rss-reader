import React, { FC } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
import BlogName from '../../features/blog/components/BlogName';
import { Blog } from '../../features/blog/models/Blog';
import { Category } from '../../features/category/models/Category';

type ContentListProps = {
  blogs: Blog[];
  categories: Category[];
};

const ContentList: FC<ContentListProps> = ({ blogs, categories }) => {
  const getCategoryBlogs = (categoryId: string): Blog[] => blogs.filter(blog => blog.categoryId === categoryId);

  return (
    <div className="mb-n2">
      <ListGroup className="mb-2 list-group-horizontal text-center">
        <ListGroup.Item action exact activeClassName="active" as={NavLink} to="/">
          All articles
        </ListGroup.Item>
        <ListGroup.Item action activeClassName="active" as={NavLink} to="/manage-content">
          Add content
        </ListGroup.Item>
      </ListGroup>

      {categories.map(category => (
        <ListGroup key={category.id} className="mb-2">
          <ListGroup.Item action activeClassName="active" as={NavLink} to={`/category/${category.id}`}>
            {category.name}
          </ListGroup.Item>

          {getCategoryBlogs(category.id).map(blog => (
            <ListGroup.Item activeClassName="active" action as={NavLink} to={`/blog/${blog.id}`} key={blog.id}>
              <span className="ml-4 d-block">
                <BlogName blog={blog} />
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ))}
    </div>
  );
};

export default ContentList;
