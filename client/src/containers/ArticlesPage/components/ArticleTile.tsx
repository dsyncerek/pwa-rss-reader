import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Article } from '../../../models/Article';

type ArticleTileProps = {
  article: Article;
  markAsRead: (id: string) => void;
};

const ArticleTile: FC<ArticleTileProps> = ({ article, markAsRead }) => (
  <Card style={{ opacity: article.read ? 0.5 : 1 }}>
    <Card.Body>
      <Card.Title>{article.title}</Card.Title>
      <Card.Text>
        {/*todo*/}
        {/*<time>{article.date.toLocaleDateString()}</time>*/}
        <span className="d-block">
          {article.blog?.category?.name} | {article.blog?.name}
        </span>
      </Card.Text>
      <ButtonToolbar>
        <Button as={Link} to={`/article/${article.id}`} onClick={() => markAsRead(article.id)}>
          View
        </Button>
        <Button as="a" href={article.link} target="_blank" rel="noreferrer">
          View original
        </Button>
        {!article.read && <Button onClick={() => markAsRead(article.id)}>Mark as Read</Button>}
      </ButtonToolbar>
    </Card.Body>
  </Card>
);

export default ArticleTile;
