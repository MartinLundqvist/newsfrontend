import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { Loader } from './Loader';
import { useNews } from '../contexts/NewsProvider';
import { useFilter } from '../contexts/FilterProvider';
import { IHeadlines } from '../types';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  padding: 1rem 2rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1em;

  @media (max-width: 400px) {
    padding: 0.25rem 1rem;
  }
`;

export const Content = (): JSX.Element => {
  const { isError, isLoading, newsAPI } = useNews();
  const { filter } = useFilter();
  const [showLoader, setShowLoader] = useState(true);
  const [news, setNews] = useState<IHeadlines[]>([]);

  useEffect(() => {
    setTimeout(() => setShowLoader(false), 2500);
  }, []);

  useEffect(() => {
    newsAPI && filter && setNews(newsAPI.filteredNews(filter));
  }, [newsAPI, filter]);

  if (isLoading || showLoader) {
    return <Loader />;
  }

  if (isError || !newsAPI) {
    return <p>Error...</p>;
  }

  return (
    <Wrapper>
      {news.map((entry) => (
        <Card key={entry.newspaper} newspaper={entry.newspaper}>
          <ul>
            {entry.headlines.map((headline) => (
              <li key={headline.headline}>
                <a href={headline.url} target='_blank'>
                  {headline.headline}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </Wrapper>
  );
};
