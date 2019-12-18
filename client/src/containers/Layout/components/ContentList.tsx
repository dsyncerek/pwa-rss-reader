import React, { FC } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
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

const ContentList: FC<ContentListProps> = ({ blogs, categories, loading, error }) => {
  const getCategoryBlogs = (categoryId: string): Blog[] => blogs.filter(blog => blog.categoryId === categoryId);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="mb-0">Your content</h2>
        <Button as={Link} to="/manage-content">
          <span className="fas fa-cog" aria-label="Manage" />
        </Button>
      </div>

      <ListGroup className="mb-2">
        <ListGroup.Item action as={Link} to={`/`}>
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

                {getCategoryBlogs(category.id).map(blog => (
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
};

export default ContentList;
