import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  bottom: 0;
  width: 100%;
  justify-content: center;
  z-index: 1;
`;

const FootNote = styled.a`
  padding: 0.5rem 0 0.5rem 0;
  position: relative;
  font-size: 0.6rem;
  font-weight: 300;

  text-decoration: none;
  color: inherit;

  &::after {
    position: absolute;
    content: '';
    left: 0;
    bottom: 0.4rem;
    height: 1px;
    width: 100%;
    background: red;
    transform: translateX(-5rem);
    opacity: 0;
    transition: all 300ms ease-in-out;
  }

  &:hover {
    &::after {
      transform: translateX(0);
      opacity: 0.5;
    }
  }
`;

export const Footer = (): JSX.Element => {
  return (
    <Container>
      <FootNote href='https://martinlundqvist.se' target='_blank'>
        Developed by Martin lundqvist
      </FootNote>
    </Container>
  );
};
