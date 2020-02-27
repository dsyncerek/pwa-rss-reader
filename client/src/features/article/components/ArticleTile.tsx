import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Article } from '../models/Article';

type ArticleTileProps = {
  article: Article;
  markAsRead: (id: string) => void;
};

const ArticleTile: FC<ArticleTileProps> = ({ article, markAsRead }) => {
  return (
    <Card as="article" style={{ opacity: article.read ? 0.5 : 1 }}>
      <Card.Body>
        <h2 className="h5">{article.title}</h2>
        <time>{new Date(article.date).toLocaleDateString()}</time>
        <p>
          {article.blog?.category?.name} | {article.blog?.name}
        </p>
        <ButtonToolbar>
          <Button size="sm" as={Link} to={`/article/${article.id}`}>
            View
          </Button>
          <Button
            size="sm"
            as="a"
            href={article.link}
            target="_blank"
            rel="noreferrer"
            onClick={() => markAsRead(article.id)}
          >
            View original
          </Button>
          {!article.read && (
            <Button size="sm" onClick={() => markAsRead(article.id)}>
              Mark as Read
            </Button>
          )}
        </ButtonToolbar>
      </Card.Body>
    </Card>
  );
};

export default ArticleTile;
