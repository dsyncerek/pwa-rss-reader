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
}) => {
  const getArticleBlog = (article?: Article): Blog | undefined => blogs.find(blog => blog.id === article?.blogId);
  const getBlogCategory = (blog?: Blog): Category | undefined =>
    categories.find(category => category.id === blog?.categoryId);

  useEffect(() => {
    console.log('xd');
    fetchPage(1);
  }, [fetchPage]);

  const allPagesLoaded = currentPage >= pageCount;

  return (
    <>
      <div>
        {articles.map((article, index) => {
          const blog = getArticleBlog(article);
          const category = getBlogCategory(blog);

          if (blog && category) {
            return (
              <React.Fragment key={article.id}>
                <ArticleTile article={article} blog={blog} category={category} />

                {index % 20 === 19 && <Waypoint onEnter={() => fetchPage(Math.ceil(index / 20) + 1)} />}
              </React.Fragment>
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
