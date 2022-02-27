import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { useNews } from '../../contexts/NewsProvider';
import { useFilter } from '../../contexts/FilterProvider';
import { IHeadlines } from '../../types';

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

const Headlines = (): JSX.Element => {
  const { isError, isLoading, newsAPI } = useNews();
  const { filter } = useFilter();
  const [news, setNews] = useState<IHeadlines[]>([]);

  useEffect(() => {
    newsAPI && filter && setNews(newsAPI.filteredNews(filter));
  }, [newsAPI, filter]);

  if (isError || !newsAPI) {
    return <></>;
  }

  return (
    <Wrapper>
      {news.map((entry) => (
        <Card key={entry.newspaper} headlines={entry} />
      ))}
    </Wrapper>
  );
};

export default Headlines;
