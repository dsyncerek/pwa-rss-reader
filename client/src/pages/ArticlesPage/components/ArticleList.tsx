import React, { FC } from 'react';
import { CardColumns } from 'react-bootstrap';
import { Waypoint } from 'react-waypoint';
import { Article } from '../../../models/Article';
import ArticleTile from './ArticleTile';

type ArticleListProps = {
  onScrolledBottom: () => void;
  articles: Article[];
};

const ArticleList: FC<ArticleListProps> = ({ articles = [], onScrolledBottom }) => (
  <CardColumns>
    {articles.map(article => (
      <ArticleTile key={article.id} article={article} blogName="Comander" />
    ))}

    <Waypoint onEnter={onScrolledBottom} />
  </CardColumns>
);

export default ArticleList;
