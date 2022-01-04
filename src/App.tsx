import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Content } from './components/Content';
import { useFilter } from './contexts/FilterProvider';
import { Cloud } from './components/Cloud';

const App = (): JSX.Element => {
  const { filter } = useFilter();

  return (
    <React.Fragment>
      <Header />
      {filter.visualize === 'newspaper' && <Content />}
      {filter.visualize === 'cloud' && <Cloud />}
      <Footer />
    </React.Fragment>
  );
};

export default App;
