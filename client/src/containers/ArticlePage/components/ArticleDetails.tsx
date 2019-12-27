import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import { Article } from '../../../models/Article';

type ArticleDetailsProps = {
  article: Article;
};

const ArticleDetails: FC<ArticleDetailsProps> = ({ article }) => (
  <>
    <h2>{article.title}</h2>
    {/*todo*/}
    {/*<div>{article.date.toLocaleDateString()}</div>*/}
    <div>
      {article.blog?.category?.name} | {article.blog?.name}
    </div>
    <Button as="a" href={article.link} target="_blank" rel="noreferrer">
      View original
    </Button>
    <div>{article.summary}</div>
  </>
);

export default ArticleDetails;
