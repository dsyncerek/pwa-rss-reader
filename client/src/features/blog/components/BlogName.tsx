import React, { FC } from 'react';
import { Blog } from '../models/Blog';

type BlogNameProps = {
  blog: Blog;
};

export const BlogName: FC<BlogNameProps> = ({ blog: { name, icon } }) => (
  <span className="d-inline-flex">
    {icon && <img className="mr-1 mt-1" style={{ width: '1em', height: '1em' }} src={icon} alt="" />}
    {name}
  </span>
);
