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
  font-family: 'Bebas Neue', cursive;
  background-color: var(--color-card);

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

  @media (max-width: 550px) {
    padding: 0.25rem 1rem;
    flex-direction: column;
    h3 {
      font-size: 1rem;
      margin-block-start: 0.25rem;
      margin-block-end: 0.25rem;
    }
  }
`;

export const Header = (): JSX.Element => {
  const { isLoading, isError, newsAPI } = useNews();
  const [latestDate, setLatestDate] = useState<string>('Laddar...');

  useEffect(() => {
    if (newsAPI) {
      setLatestDate(newsAPI.latestUpdate().toLocaleString());
    }
  }, [newsAPI]);

  return (
    <Wrapper>
      <h3>NewsScraper</h3>
      <h3>Toppnyheterna varannan minut</h3>
      <h3>
        Uppdaterad: <span>{latestDate}</span>
      </h3>
    </Wrapper>
  );
};
