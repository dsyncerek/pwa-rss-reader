import React, { FC } from 'react';
import { Blog } from '../models/Blog';

type BlogNameProps = {
  blog: Blog;
};

const BlogName: FC<BlogNameProps> = ({ blog: { name, icon } }) => (
  <span className="d-inline-flex align-items-center">
    {icon && <img style={{ width: '1em', height: '1em', marginRight: '0.25em' }} src={icon} alt="" />}
    {name}
  </span>
);

export default BlogName;
