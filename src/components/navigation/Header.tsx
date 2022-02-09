import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNews } from '../../contexts/NewsProvider';
import { Button } from '../elements/Button';
import { Menu } from './Menu';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 0.5rem 2rem;
  justify-content: space-between;
  align-items: baseline;
  box-shadow: 0px 0px 5px 5px hsla(0, 0%, 0%, 0.25);
  font-family: 'Bebas Neue', cursive;
  background-color: var(--color-card);

  h3 {
    margin-block-start: 0.5rem;
    margin-block-end: 0.5rem;
    text-align: right;
  }

  span {
    color: var(--color-link);
  }

  @media (max-width: 600px) {
    padding: 0.25rem 1rem;
    display: grid;
    grid-template-columns: auto auto;
    h3 {
      grid-column: 1 / 2;
      justify-self: start;
      font-size: 1rem;
      margin-block-start: 0.25rem;
      margin-block-end: 0.25rem;
    }

    div {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
      justify-self: end;
    }
  }
`;

interface IMenuButtonProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MenuButton = ({ open, setOpen }: IMenuButtonProps): JSX.Element => {
  return (
    <Button onClick={() => setOpen(!open)}>
      {open ? 'Göm filter' : 'Visa filter'}
    </Button>
  );
};

export const Header = (): JSX.Element => {
  const { isLoading, isError, newsAPI } = useNews();
  const [latestDate, setLatestDate] = useState<string>('Laddar...');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (newsAPI) {
      setLatestDate(newsAPI.latestUpdate().toLocaleString());
    }
  }, [newsAPI]);

  return (
    <>
      <Wrapper>
        <h3>Toppnyheterna varannan minut</h3>
        <h3>
          Uppdaterad: <span>{latestDate}</span>
        </h3>
        <MenuButton open={open} setOpen={setOpen} />
      </Wrapper>
      <Menu open={open} />
    </>
  );
};
