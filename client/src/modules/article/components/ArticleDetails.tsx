import React, { FC, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Loader from '../../../common/components/Loader';
import { Article } from '../models/Article';

type ArticleDetailsProps = {
  article?: Article;
  loading?: boolean;
  error?: string;
  markAsRead: (id: string) => void;
};

const ArticleDetails: FC<ArticleDetailsProps> = ({ article, loading, error, markAsRead }) => {
  const id = article?.id;

  useEffect(() => {
    if (id) {
      markAsRead(id);
    }
  }, [id, markAsRead]);

  return (
    <>
      {loading && <Loader />}

      {error && (
        <Alert className="mb-2" variant="danger">
          {error}
        </Alert>
      )}

      {article && (
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
      )}
    </>
  );
};

export default ArticleDetails;
