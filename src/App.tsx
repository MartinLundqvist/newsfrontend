import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from './components/Header';
import Card from './components/Card';
import { useNews } from './contexts/NewsProvider';

import { IHeadlines } from './types';

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

const Content = (): JSX.Element => {
  const { isError, isLoading, newsAPI } = useNews();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !newsAPI) {
    return <p>Error...</p>;
  }

  return (
    <Wrapper>
      {newsAPI.latestNews().map((entry) => (
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

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Header />
      <Content />
    </React.Fragment>
  );
};

export default App;
