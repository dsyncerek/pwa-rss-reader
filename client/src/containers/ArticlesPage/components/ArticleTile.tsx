import React, { FC } from 'react';
import { Button, ButtonToolbar, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Article } from '../../../models/Article';

type ArticleTileProps = {
  article: Article;
  blogName: string;
};

const ArticleTile: FC<ArticleTileProps> = ({ article, blogName }) => (
  <Card>
    <Card.Body>
      <Card.Title>{article.title}</Card.Title>
      <Card.Subtitle>
        {blogName} | {article.date.toLocaleString()}
      </Card.Subtitle>
      <Card.Text>{article.summary}</Card.Text>
      <ButtonToolbar>
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
