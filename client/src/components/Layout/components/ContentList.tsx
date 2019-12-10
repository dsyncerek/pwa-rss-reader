import React, { FC } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Blog } from '../../../models/Blog';
import { Category } from '../../../models/Category';
import BlogName from '../../BlogName';

type ContentListProps = {
  blogs: Blog[];
  categories: Category[];
};

const ContentList: FC<ContentListProps> = ({ blogs, categories }) => (
  <>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h2>Your content</h2>
      <Button as={Link} to="/manage-content">
        <span className="fas fa-cog" aria-label="Manage" />
      </Button>
    </div>

    <ListGroup className="mb-2">
      <ListGroup.Item action active as={Link} to={`/`}>
        All
      </ListGroup.Item>
    </ListGroup>

    {categories.map(category => (
      <ListGroup key={category.id} className="mb-2">
        <ListGroup.Item action as={Link} to={`/category/${category.id}`}>
          {category.name}
        </ListGroup.Item>

        {blogs
          .filter(blog => blog.categoryId === category.id)
          .map(blog => (
            <ListGroup.Item key={blog.id} className="pl-5" action as={Link} to={`/blog/${blog.id}`}>
              <BlogName blog={blog} />
            </ListGroup.Item>
          ))}
      </ListGroup>
    ))}
  </>
);

export default ContentList;
