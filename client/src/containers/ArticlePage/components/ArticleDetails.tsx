import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import { Article } from '../../../models/Article';
import { Blog } from '../../../models/Blog';
import { Category } from '../../../models/Category';

type ArticleDetailsProps = {
  article: Article;
  blog: Blog;
  category: Category;
};

const ArticleDetails: FC<ArticleDetailsProps> = ({ article, blog, category }) => (
  <>
    <h1>{article.title}</h1>
    <div>{article.date.toLocaleDateString()}</div>
    <div>
      {category.name} | {blog.name}
    </div>
    <Button as="a" href={article.link} target="_blank">
      View original
    </Button>
    <div>{article.summary}</div>
  </>
);

export default ArticleDetails;
