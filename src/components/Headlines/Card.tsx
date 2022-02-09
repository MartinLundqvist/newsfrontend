import styled from 'styled-components';
import {
  ExpressenLogo,
  SydsvenskanLogo,
  DNLogo,
  SVDLogo,
  GPLogo,
  AftonbladetLogo,
  WSJLogo,
  GuardianLogo,
} from '../elements/Logos';
import { TNewsPaper } from '../../types';

const Container = styled.div`
  display: grid;
  position: relative;
  width: 100%;
  justify-items: stretch;
  align-items: stretch;
  justify-content: flex-start;
  grid-template-columns: 1fr;
  grid-template-rows: 4vh 1fr;
  padding: 1rem;
  border-radius: 0.1rem;
  box-shadow: 3px 3px 5px 3px hsla(0, 0%, 0%, 0.25);
  background-color: var(--color-card);

  ul {
    width: 100%;
    list-style: none;
    padding-inline-start: 0;
    font-family: 'Bebas Neue', cursive;
    font-size: 1.2rem;
    margin-block-end: 0;

    li {
      position: relative;
      margin-block-end: 0.35em;

      a {
        display: block;
        position: relative;
        text-decoration: none;
        color: inherit;
      }

      &:hover {
        color: var(--color-link);
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -0.125em;
        left: 3px;
        width: calc(100% - 6px);
        height: 1px;
        background: hsla(0, 0%, 0%, 0.25);
      }
    }

    li:last-child {
      margin-block-end: 0;

      &::after {
        display: none;
      }
    }
  }
`;

export type TNewsPaperLogo = {
  newspaper: TNewsPaper;
  newspaperlogo: JSX.Element;
};

const newsPaperLogos: TNewsPaperLogo[] = [
  {
    newspaper: 'SVD',
    newspaperlogo: <SVDLogo />,
  },
  {
    newspaper: 'Aftonbladet',
    newspaperlogo: <AftonbladetLogo />,
  },
  {
    newspaper: 'Sydsvenskan',
    newspaperlogo: <SydsvenskanLogo />,
  },
  {
    newspaper: 'GP',
    newspaperlogo: <GPLogo />,
  },
  {
    newspaper: 'DN',
    newspaperlogo: <DNLogo />,
  },
  {
    newspaper: 'Expressen',
    newspaperlogo: <ExpressenLogo />,
  },
  {
    newspaper: 'WSJ',
    newspaperlogo: <WSJLogo />,
  },
  {
    newspaper: 'Guardian',
    newspaperlogo: <GuardianLogo />,
  },
];

interface ICardProps {
  children: React.ReactNode;
  newspaper: TNewsPaper;
}

export const Card = ({ newspaper, children }: ICardProps): JSX.Element => {
  return (
    <Container>
      {
        newsPaperLogos.find((logo) => logo.newspaper === newspaper)
          ?.newspaperlogo
      }
      {children}
    </Container>
  );
};
