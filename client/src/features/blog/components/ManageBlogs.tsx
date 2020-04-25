import React, { FC, FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectAsyncStatus } from '../../../core/async/async.selectors';
import { createBlog, deleteBlog, fetchAllBlogs, updateBlog } from '../blog.actions';
import { selectAllBlogs } from '../blog.selectors';
import { BlogTable } from './BlogTable';
import { SaveBlogModal } from './SaveBlogModal';
import { Blog, SaveBlog } from '../models/Blog';
import { fetchAllCategories } from '../../category/category.actions';
import { selectAllCategories } from '../../category/category.selectors';

export const ManageBlogs: FC = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectAllBlogs);
  const categories = useSelector(selectAllCategories);
  const [fetching] = useSelector(state => selectAsyncStatus(state, [fetchAllBlogs, fetchAllCategories]));
  const [saving, saveError] = useSelector(state => selectAsyncStatus(state, [createBlog, updateBlog]));
  const [removing] = useSelector(state => selectAsyncStatus(state, [deleteBlog]));
  const defaultBlog: SaveBlog = { rss: '', categoryId: '' };

  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<SaveBlog>(defaultBlog);

  useEffect(() => {
    if (!saving && !saveError) {
      closeModal();
    }
  }, [saving, saveError]);

  const changeInput = (event: any) => {
    const { name, value } = event.target;
    setSelected({ ...selected, [name]: value });
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    if (selected.id) {
      dispatch(updateBlog({ blog: selected }));
    } else {
      dispatch(createBlog({ blog: selected }));
    }
  };

  const performDelete = (blog: Blog) => {
    setSelected(blog);
    dispatch(deleteBlog({ id: blog.id }));
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openCreateModal = () => {
    setSelected(defaultBlog);
    setModalVisible(true);
  };

  const openUpdateModal = (blog: Blog) => {
    setSelected(blog);
    setModalVisible(true);
  };

  return (
    <div className="mb-n3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="mb-0">Blogs</h2>
        <Button onClick={openCreateModal}>
          <span className="fas fa-plus" aria-label="Add" />
        </Button>
      </div>

      <BlogTable
        blogs={blogs}
        loading={fetching}
        removing={removing}
        selectedId={selected?.id}
        onDelete={performDelete}
        onUpdate={openUpdateModal}
      />

      <SaveBlogModal
        blog={selected}
        categories={categories}
        saving={saving}
        error={saveError?.message}
        isVisible={modalVisible}
        onClose={closeModal}
        onChange={changeInput}
        onSubmit={submitForm}
      />
    </div>
  );
};
