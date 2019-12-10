import React, { FC } from 'react';
import { Button, ButtonToolbar, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Article } from '../../../models/Article';

type ArticleDetailsProps = {
  article: Article;
  blogName: string;
};

const ArticleDetails: FC<ArticleDetailsProps> = ({ article, blogName }) => (
  <Card>
    <Card.Body>
      <Card.Title>{article.title}</Card.Title>
      <Card.Subtitle>
        {blogName} | {article.date.toLocaleString()}
      </Card.Subtitle>
      <Card.Text>{article.summary}</Card.Text>
      <ButtonToolbar>
        <Button as={Link} to={`/articles/${article.slug}`}>
          View
        </Button>
        <Button as="a" href={article.link} target="_blank">
          View original
        </Button>
        <Button>Mark as read</Button>
      </ButtonToolbar>
    </Card.Body>
  </Card>
);

export default ArticleDetails;
