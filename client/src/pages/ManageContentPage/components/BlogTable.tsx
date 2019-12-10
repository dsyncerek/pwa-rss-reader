import React, { FC, FormEvent, useState } from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import BlogName from '../../../components/BlogName';
import Loader from '../../../components/Loader';
import { Blog, SaveBlog } from '../../../models/Blog';
import { Category } from '../../../models/Category';
import { Dictionary } from '../../../models/Dictionary';
import { HttpError } from '../../../models/HttpError';
import SaveBlogModal from './SaveBlogModal';

const defaultBlog: SaveBlog = { rss: '', categoryId: '' };

type BlogTableProps = {
  blogs: Dictionary<Blog>;
  loading: boolean;
  error?: HttpError;

  categories: Dictionary<Category>;

  onCreate: (blog: SaveBlog) => void;
  onUpdate: (blog: SaveBlog) => void;
  onDelete: (id: string) => void;
};

const BlogTable: FC<BlogTableProps> = ({ blogs, loading, categories, onCreate, onUpdate, onDelete }) => {
  const blogsArray = Object.values(blogs);
  const categoriesArray = Object.values(categories);

  const [blogModalVisible, setBlogModalVisible] = useState(false);
  const [editedBlog, setEditedBlog] = useState<SaveBlog>(defaultBlog);

  const onChange = (event: any) => {
    const { name, value } = event.target;
    setEditedBlog({ ...editedBlog, [name]: value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (editedBlog.id) {
      onUpdate(editedBlog);
    } else {
      onCreate(editedBlog);
    }

    setBlogModalVisible(false);
  };

  const onModalClose = () => {
    setBlogModalVisible(false);
  };

  const onCreateClick = () => {
    setEditedBlog(defaultBlog);
    setBlogModalVisible(true);
  };

  const onUpdateClick = (blog: Blog) => {
    setEditedBlog(blog);
    setBlogModalVisible(true);
  };

  const onDeleteClick = (id: string) => {
    onDelete(id);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2>Blogs</h2>
        <Button onClick={onCreateClick}>
          <span className="fas fa-plus" aria-label="Add" />
        </Button>
      </div>

      <Table bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {blogsArray.map(blog => (
            <tr key={blog.id}>
              <td>
                <a href={blog.link} target="_blank" rel="noopener noreferrer">
                  <BlogName blog={blog} />
                </a>
              </td>
              <td>{categories[blog.categoryId]?.name}</td>
              <td>
                <ButtonToolbar>
                  <Button size="sm" onClick={() => onUpdateClick(blog)}>
                    <span className="fas fa-pen" aria-label="Edit" />
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => onDeleteClick(blog.id)}>
                    <span className="fas fa-trash" aria-label="Delete" />
                  </Button>
                </ButtonToolbar>
              </td>
            </tr>
          ))}
          {!blogsArray.length && (
            <tr>
              <td colSpan={2}>No results.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <SaveBlogModal
        blog={editedBlog}
        categories={categoriesArray}
        isVisible={blogModalVisible}
        onClose={onModalClose}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default BlogTable;
