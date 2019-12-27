import React, { FC } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Article } from '../../models/Article';
import Loader from '../Loader';

type ArticleDetailsProps = {
  article?: Article;
  loading?: boolean;
  error?: string;
};

const ArticleDetails: FC<ArticleDetailsProps> = ({ article, loading, error }) => (
  <>
    {loading && <Loader />}
    {error && (
      <Alert className="mb-2" variant="danger">
        {error}
      </Alert>
    )}

    {article && (
      <article>
        <h2>{article.title}</h2>
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

export default ArticleDetails;
