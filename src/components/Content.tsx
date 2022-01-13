import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';
import { useNews } from '../contexts/NewsProvider';
import { useFilter } from '../contexts/FilterProvider';
import { IHeadlines } from '../types';
import { Headlines } from './Headlines';
import { Cloud } from './Cloud';

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

  useEffect(() => {
    setTimeout(() => setShowLoader(false), 2500);
  }, []);

  if (isLoading || showLoader) {
    return <Loader />;
  }

  if (isError || !newsAPI) {
    return <></>;
  }

  return (
    <>
      {filter.visualize === 'newspaper' && <Headlines />}
      {filter.visualize === 'cloud' && <Cloud />}
    </>
  );
};
