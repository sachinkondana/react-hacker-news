import React, { useState, useEffect } from 'react';
import NewsTable from './components/NewsTable';

import NewsActions from './actions';

import styles from './HackerNews.module.scss';


function HackerNews() {
  const [news, setNews] = useState(null);
  const [page, setPage] = useState(0);
  const [max, setMax] = useState(100);

  useEffect(() => {
    NewsActions.getNews(page).then(d => {
      setNews(d.hits);
      setMax(d.nbHits);
    });
  }, [page]);

  return (
    <NewsTable
      data={news}
      onPaginationChange={setPage}
      page={page}
      max={max}
    />
  );
}

export default HackerNews;
