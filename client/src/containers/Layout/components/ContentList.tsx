import React, { FC } from 'react';
import { Alert, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlogName from '../../../components/BlogName';
import Loader from '../../../components/Loader';
import { Blog } from '../../../models/Blog';
import { Category } from '../../../models/Category';

type ContentListProps = {
  blogs: Blog[];
  categories: Category[];
  loading: boolean;
  error?: string;
};

const ContentList: FC<ContentListProps> = ({ blogs, categories, loading, error }) => (
  <>
    <ListGroup className="mb-2">
      <ListGroup.Item action active as={Link} to={`/`}>
        All
      </ListGroup.Item>
    </ListGroup>

    <Loader loading={loading}>
      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
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
      )}
    </Loader>
  </>
);

export default ContentList;
