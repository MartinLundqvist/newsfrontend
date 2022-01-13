import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Content } from './components/Content';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
`;

const App = (): JSX.Element => {
  return (
    <Wrapper>
      <Header />
      <Content />
      <Footer />
    </Wrapper>
  );
};

export default App;
