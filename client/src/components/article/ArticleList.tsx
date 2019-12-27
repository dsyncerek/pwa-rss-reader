import React, { FC, useEffect } from 'react';
import { Waypoint } from 'react-waypoint';
import { Article } from '../../models/Article';
import Loader from '../Loader';
import ArticleTile from './ArticleTile';

type ArticleListProps = {
  articles: Article[];
  loading: boolean;
  fetchPage: (page: number) => void;
  markAsRead: (id: string) => void;
};

const ArticleList: FC<ArticleListProps> = ({ articles, loading, fetchPage, markAsRead }) => {
  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const renderNextPageWaypoint = (articleIndex: number) => {
    const pageSize = +(process.env.REACT_APP_ARTICLES_PAGE_SIZE || 20);

    // load next page if we are in the middle of current
    if (articleIndex % pageSize === pageSize / 2) {
      const currentPage = Math.ceil(articleIndex / pageSize);
      return <Waypoint onEnter={() => fetchPage(currentPage + 1)} />;
    }

    return null;
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 mb-n4">
        {articles.map((article, index) => (
          <div className="col mb-4" key={article.id}>
            <ArticleTile article={article} markAsRead={markAsRead} />
            {renderNextPageWaypoint(index)}
          </div>
        ))}
      </div>

      {loading && <Loader />}
    </>
  );
};

export default ArticleList;
