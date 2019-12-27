import React, { FC, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Waypoint } from 'react-waypoint';
import Loader from '../../../components/Loader';
import { Article } from '../../../models/Article';
import ArticleTile from './ArticleTile';

type ArticleListProps = {
  articles: Article[];
  currentPage: number;
  pageCount: number;
  totalItems: number;
  loading: boolean;
  error?: string;
  fetchPage: (page: number) => void;
  markAsRead: (id: string) => void;
};

const ArticleList: FC<ArticleListProps> = ({
  articles,
  currentPage,
  pageCount,
  totalItems,
  loading,
  error,
  fetchPage,
  markAsRead,
}) => {
  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const allPagesLoaded = currentPage >= pageCount;

  return (
    <>
      <div className="row row row-cols-1 row-cols-md-3">
        {articles.map((article, index) => (
          <div className="col mb-4" key={article.id}>
            <ArticleTile article={article} markAsRead={markAsRead} />

            {index % 20 === 19 && <Waypoint onEnter={() => fetchPage(Math.ceil(index / 20) + 1)} />}
          </div>
        ))}
      </div>

      {error ? <Alert variant="danger">{error}</Alert> : <Loader loading={!allPagesLoaded} />}

      {allPagesLoaded && <Alert variant="success">All pages loaded!</Alert>}
    </>
  );
};

export default ArticleList;
