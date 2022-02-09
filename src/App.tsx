import { Header } from './components/navigation/Header';
import { Content } from './components/Content';
import { Footer } from './components/navigation/Footer';
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
