import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Loader } from './elements/Loader';
import { useNews } from '../contexts/NewsProvider';
import { useFilter } from '../contexts/FilterProvider';
import Headlines from './Headlines';
import Cloud from './Cloud';
import Sentiment from './Sentiment';

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
      {filter.visualize === 'sentiment' && <Sentiment />}
    </>
  );
};
