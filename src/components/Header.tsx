import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNews } from '../contexts/NewsProvider';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 0.5rem 2rem;
  justify-content: space-between;
  align-items: baseline;
  box-shadow: 0px 0px 5px 5px hsla(0, 0%, 0%, 0.25);
  font-family: 'Roboto', sans-serif;

  h2,
  h3 {
    margin-block-start: 0.5rem;
    margin-block-end: 0.5rem;
  }

  h3 {
    text-align: right;
  }

  span {
    color: darkblue;
  }

  @media (max-width: 500px) {
    padding: 0.25rem 1rem;
    h3 {
      font-size: 1rem;
    }
  }
`;

export const Header = (): JSX.Element => {
  const { isLoading, isError, newsAPI } = useNews();
  const [latestDate, setLatestDate] = useState<string>('Loading');

  useEffect(() => {
    if (newsAPI) {
      setLatestDate(newsAPI.latestUpdate().toLocaleString());
    }
  }, [newsAPI]);

  return (
    <Wrapper>
      <h2>NewsScraper</h2>
      <h3>
        Updaterad: <span>{latestDate}</span>
      </h3>
    </Wrapper>
  );
};
