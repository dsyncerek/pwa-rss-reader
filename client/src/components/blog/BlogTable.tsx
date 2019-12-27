import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Table from 'react-bootstrap/Table';
import { Blog } from '../../models/Blog';
import Loader from '../Loader';
import BlogName from './BlogName';

type BlogTableProps = {
  blogs: Blog[];
  loading?: boolean;
  removing?: boolean;
  selectedId?: string;
  onUpdate: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
};

const BlogTable: FC<BlogTableProps> = ({ blogs, loading, removing, selectedId, onUpdate, onDelete }) => {
  const isRemovingCurrentRow = (id: string): boolean => {
    return !!removing && selectedId === id;
  };

  return (
    <Table responsive bordered>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {blogs.map(blog => (
          <tr key={blog.id}>
            <td>
              <a href={blog.link} target="_blank" rel="noopener noreferrer">
                <BlogName blog={blog} />
              </a>
            </td>
            <td>{blog.category?.name}</td>
            <td className="text-nowrap">
              <ButtonToolbar>
                <Button size="sm" onClick={() => onUpdate(blog)}>
                  <span className="fas fa-fw fa-pen" aria-label="Edit" />
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(blog)}
                  disabled={isRemovingCurrentRow(blog.id)}
                >
                  {isRemovingCurrentRow(blog.id) ? (
                    <span className="fas fa-fw fa-spin fa-spinner" aria-label="Delete" />
                  ) : (
                    <span className="fas fa-fw fa-trash" aria-label="Removing" />
                  )}
                </Button>
              </ButtonToolbar>
            </td>
          </tr>
        ))}
        {loading && (
          <tr>
            <td colSpan={3} className="p-0">
              <Loader />
            </td>
          </tr>
        )}
        {!blogs.length && !loading && (
          <tr>
            <td colSpan={3}>No results.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default BlogTable;
