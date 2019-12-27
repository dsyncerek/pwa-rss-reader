import React, { FC, FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { connect, ConnectedProps } from 'react-redux';
import { createBlog, deleteBlog, updateBlog } from '../../actions/blogActions';
import { BlogActionTypes } from '../../actions/blogActionTypes';
import { CategoryActionTypes } from '../../actions/categoryActionTypes';
import { Blog, SaveBlog } from '../../models/Blog';
import { RootState } from '../../reducers';
import { errorSelector, loadingSelector } from '../../selectors/asyncSelectors';
import { blogsSelector } from '../../selectors/blogSelectors';
import { categoriesSelector } from '../../selectors/categorySelectors';
import BlogTable from './components/BlogTable';
import SaveBlogModal from './components/SaveBlogModal';

const mapState = (state: RootState) => ({
  blogs: blogsSelector(state),
  categories: categoriesSelector(state),
  fetching: loadingSelector(state, [BlogActionTypes.FETCH_ALL_BLOGS, CategoryActionTypes.FETCH_ALL_CATEGORIES]),
  saving: loadingSelector(state, [BlogActionTypes.CREATE_BLOG, BlogActionTypes.UPDATE_BLOG]),
  removing: loadingSelector(state, [BlogActionTypes.DELETE_BLOG]),
  saveError: errorSelector(state, [BlogActionTypes.CREATE_BLOG, BlogActionTypes.UPDATE_BLOG]),
});

const mapDispatch = {
  createBlog,
  updateBlog,
  deleteBlog,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ManageBlogsProps = PropsFromRedux;

const ManageBlogs: FC<ManageBlogsProps> = ({
  blogs,
  categories,
  fetching,
  saving,
  removing,
  saveError,
  createBlog,
  updateBlog,
  deleteBlog,
}) => {
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
      updateBlog(selected);
    } else {
      createBlog(selected);
    }
  };

  const performDelete = (blog: Blog) => {
    setSelected(blog);
    deleteBlog(blog.id);
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

export default connector(ManageBlogs);
