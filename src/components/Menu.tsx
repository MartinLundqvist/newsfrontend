import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { useNews } from '../contexts/NewsProvider';
import { useFilter } from '../contexts/FilterProvider';
import { INewsFilter, TNewsPaper } from '../types';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 0.5rem 2rem;
  justify-content: flex-start;
  align-items: baseline;
  gap: 1rem;
  box-shadow: 0px 7px 5px 1px hsla(0, 0%, 0%, 0.25);
  font-family: 'Bebas Neue', cursive;
  background-color: var(--color-card);
  z-index: 1;
  transition: max-height 0.2s ease-in;
  max-height: 1000px;
  overflow: hidden;

  div {
    flex-grow: 1;
    flex-basis: 0;
  }

  h3 {
    position: relative;
    margin-block-start: 0.5rem;
    margin-block-end: 0.5rem;
    text-align: left;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: black;
    }
  }

  label {
    display: block;
  }

  input[type='text'] {
    border: 1px solid black;
    border-radius: 3px;
    padding: 0.25rem 1rem;
    width: 15ch;
    font-family: inherit;
    font-style: inherit;
    font-size: inherit;

    &:focus {
      outline: none;
      background-color: var(--color-bg);
    }
  }

  &.closed {
    opacity: 0;
    max-height: 0;
    padding: 0;
    /* transition: max-height 0.2s ease-in; */
    transition: max-height 0.2s cubic-bezier(0, 1, 0, 1);
  }
`;

const KeywordWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  /* max-width: 30vw; */

  div {
    background-color: var(--color-bg);
    padding: 0.1em 0.5em;
    border-radius: 25%;
    user-select: none;
    flex-grow: 0;

    span {
      padding-left: 0.25em;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

interface IMenuProps {
  open: boolean;
}

export const Menu = ({ open }: IMenuProps): JSX.Element => {
  const { isError, isLoading, newsAPI } = useNews();
  const { filter, setFilter } = useFilter();
  const [localFilter, setLocalFilter] = useState<INewsFilter>();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    // console.log(filter);
    setLocalFilter(filter);
  }, [filter]);

  const handleNewspaperChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const checked = event.target.checked;
    const newspapers = localFilter ? [...localFilter.newspapers] : [];

    if (checked && !newspapers.includes(value as TNewsPaper)) {
      newspapers.push(value as TNewsPaper);
    }

    if (!checked && newspapers.includes(value as TNewsPaper)) {
      newspapers.splice(newspapers.indexOf(value as TNewsPaper), 1);
    }

    localFilter && setLocalFilter({ ...localFilter, newspapers });
  };

  const handleKeywordAdd = () => {
    const keywords = localFilter ? [...localFilter.keywords] : [];
    if (keywords.includes(keyword)) {
      return;
    }

    localFilter &&
      keyword &&
      setLocalFilter({
        ...localFilter,
        keywords: [...localFilter?.keywords, keyword],
      });

    setKeyword('');
  };

  const handleKeywordRemove = (value: string) => {
    const keywords = localFilter ? [...localFilter.keywords] : [];
    keywords.splice(keywords.indexOf(value), 1);
    localFilter && setLocalFilter({ ...localFilter, keywords });
  };

  if (isError || isLoading || !localFilter) {
    return <></>;
  }

  return (
    <Wrapper className={!open ? 'closed' : ''}>
      <div>
        <h3>Tidningar</h3>
        {newsAPI?.newspapers().map((newspaper) => (
          <label key={'label for ' + newspaper}>
            <input
              type='checkbox'
              key={newspaper}
              name={newspaper}
              id={newspaper}
              value={newspaper}
              checked={localFilter?.newspapers.includes(newspaper)}
              onChange={(event) => handleNewspaperChange(event)}
            />
            {newspaper}
          </label>
        ))}
      </div>
      <div>
        <h3>Tidshorisont</h3>
        Nu
        <br />
        1 timma
        <br />
        24 timmar
      </div>
      <div>
        <h3>Sökord</h3>
        <input
          type='text'
          id='keyword'
          name='keyword'
          minLength={3}
          maxLength={15}
          size={17}
          value={keyword}
          onChange={(event) => setKeyword(event.target.value.toLowerCase())}
        />
        <Button onClick={() => handleKeywordAdd()}>Lägg till</Button>
        <KeywordWrapper>
          {localFilter?.keywords.map((keyword) => (
            <div key={keyword}>
              {keyword}
              <span onClick={() => handleKeywordRemove(keyword)}>&#9747;</span>
            </div>
          ))}
        </KeywordWrapper>
      </div>
      <div>
        <h3>Spara?</h3>
        <Button onClick={() => setFilter(localFilter)}>Spara</Button>
        <Button alert onClick={() => setLocalFilter(filter)}>
          Ångra
        </Button>
      </div>
    </Wrapper>
  );
};
