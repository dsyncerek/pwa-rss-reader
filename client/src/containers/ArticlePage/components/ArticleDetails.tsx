import React, { FC } from 'react';
import { Button, ButtonToolbar, Card } from 'react-bootstrap';
import { Article } from '../../../models/Article';
import { Blog } from '../../../models/Blog';
import { Category } from '../../../models/Category';

type ArticleDetailsProps = {
  article: Article;
  blog: Blog;
  category: Category;
};

const ArticleDetails: FC<ArticleDetailsProps> = ({ article, blog, category }) => (
  <Card>
    <Card.Body>
      <Card.Title>{article.title}</Card.Title>
      <Card.Subtitle>
        {blog.name} | {category.name} | {article.date.toLocaleString()}
      </Card.Subtitle>
      <Card.Text>{article.summary}</Card.Text>
      <ButtonToolbar>
        <Button as="a" href={article.link} target="_blank">
          View original
        </Button>
      </ButtonToolbar>
    </Card.Body>
  </Card>
);

export default ArticleDetails;
