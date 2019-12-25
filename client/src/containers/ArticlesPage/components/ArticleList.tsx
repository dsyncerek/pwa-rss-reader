import React, { FC, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Waypoint } from 'react-waypoint';
import Loader from '../../../components/Loader';
import { Article } from '../../../models/Article';
import { Blog } from '../../../models/Blog';
import { Category } from '../../../models/Category';
import ArticleTile from './ArticleTile';

type ArticleListProps = {
  articles: Article[];
  blogs: Blog[];
  categories: Category[];
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
  blogs,
  categories,
  currentPage,
  pageCount,
  totalItems,
  loading,
  error,
  fetchPage,
  markAsRead,
}) => {
  const getArticleBlog = (article?: Article): Blog | undefined => blogs.find(blog => blog.id === article?.blogId);
  const getBlogCategory = (blog?: Blog): Category | undefined =>
    categories.find(category => category.id === blog?.categoryId);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const allPagesLoaded = currentPage >= pageCount;

  return (
    <>
      <div className="row row row-cols-1 row-cols-md-3">
        {articles.map((article, index) => {
          const blog = getArticleBlog(article);
          const category = getBlogCategory(blog);

          if (blog && category) {
            return (
              <div className="col mb-4" key={article.id}>
                <ArticleTile article={article} blog={blog} category={category} markAsRead={markAsRead} />

                {index % 20 === 19 && <Waypoint onEnter={() => fetchPage(Math.ceil(index / 20) + 1)} />}
              </div>
            );
          }

          return null;
        })}
      </div>

      {error ? <Alert variant="danger">{error}</Alert> : <Loader loading={!allPagesLoaded} />}

      {allPagesLoaded && <Alert variant="success">All pages loaded!</Alert>}
    </>
  );
};

export default ArticleList;
