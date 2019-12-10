import React, { FC } from 'react';
import { CardColumns } from 'react-bootstrap';
import { Article } from '../../../models/Article';
import ArticleTile from './ArticleTile';

type ArticleListProps = {
  articles: Article[];
};

const ArticleList: FC<ArticleListProps> = ({ articles = [] }) => (
  <CardColumns>
    {articles.map(article => (
      <ArticleTile key={article.id} article={article} blogName="Comander" />
    ))}
  </CardColumns>
);

export default ArticleList;
