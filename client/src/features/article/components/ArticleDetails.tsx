import React, { FC, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Article } from '../models/Article';

type ArticleDetailsProps = {
  article: Article;
  markAsRead: (id: string) => void;
};

const ArticleDetails: FC<ArticleDetailsProps> = ({ article, markAsRead }) => {
  const id = article?.id;

  useEffect(() => {
    id && markAsRead(id);
  }, [id, markAsRead]);

  return (
    <article className="overflow-hidden">
      <h2 className="h1">{article.title}</h2>
      <time>{new Date(article.date).toLocaleDateString()}</time>
      <p>
        {article.blog?.category?.name} | {article.blog?.name}
      </p>
      <Button className="mb-5" as="a" href={article.link} target="_blank" rel="noreferrer">
        View original
      </Button>
      <div dangerouslySetInnerHTML={{ __html: article?.content }} />
    </article>
  );
};

export default ArticleDetails;
