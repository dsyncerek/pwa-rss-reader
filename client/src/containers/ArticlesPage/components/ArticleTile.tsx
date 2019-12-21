import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Article } from '../../../models/Article';
import { Blog } from '../../../models/Blog';
import { Category } from '../../../models/Category';

type ArticleTileProps = {
  article: Article;
  blog: Blog;
  category: Category;
};

const ArticleTile: FC<ArticleTileProps> = ({ article, blog, category }) => (
  <Card>
    <Card.Body>
      <Card.Title>{article.title}</Card.Title>
      <Card.Subtitle>
        <time>{article.date.toLocaleDateString()}</time>
        <div>
          {category.name} | {blog.name}
        </div>
      </Card.Subtitle>
      <ButtonToolbar className="mt-3">
        <Button as={Link} to={`/article/${article.id}`}>
          View
        </Button>
        <Button as="a" href={article.link} target="_blank">
          View original
        </Button>
      </ButtonToolbar>
    </Card.Body>
  </Card>
);

export default ArticleTile;
