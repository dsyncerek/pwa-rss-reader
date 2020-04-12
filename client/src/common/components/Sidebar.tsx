import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { selectAsyncStatus } from '../../core/async/async.selectors';
import { AsyncInfo } from '../../core/async/components/AsyncInfo';
import { fetchAllBlogs } from '../../features/blog/blog.actions';
import { selectAllBlogs } from '../../features/blog/blog.selectors';
import { fetchAllCategories } from '../../features/category/category.actions';
import { selectAllCategories } from '../../features/category/category.selectors';
import { ContentList } from './ContentList';

export const Sidebar: FC = () => {
  const blogs = useSelector(selectAllBlogs);
  const categories = useSelector(selectAllCategories);
  const [fetching, fetchError] = useSelector(state => selectAsyncStatus(state, [fetchAllBlogs, fetchAllCategories]));

  return (
    <Navbar expand="lg" collapseOnSelect>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-0">RSS Reader</h1>
        <Navbar.Toggle as={Button} className="text-white" aria-controls="navbar-nav">
          <span className="fas fa-fw fa-bars" />
        </Navbar.Toggle>
      </div>
      <div className="mt-2">
        <AsyncInfo loading={fetching} error={fetchError} />
      </div>
      <Navbar.Collapse className="mt-2" id="navbar-nav">
        <ContentList blogs={blogs} categories={categories} />
      </Navbar.Collapse>
    </Navbar>
  );
};
