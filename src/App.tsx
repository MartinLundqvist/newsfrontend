import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Content } from './components/Content';
import { useFilter } from './contexts/FilterProvider';
import { Cloud } from './components/Cloud';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
`;

const App = (): JSX.Element => {
  const { filter } = useFilter();

  return (
    <Wrapper>
      <Header />
      {filter.visualize === 'newspaper' && <Content />}
      {filter.visualize === 'cloud' && <Cloud />}
      <Footer />
    </Wrapper>
  );
};

export default App;
