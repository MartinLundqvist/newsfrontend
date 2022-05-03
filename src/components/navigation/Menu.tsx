import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFilter } from '../../contexts/FilterProvider';
import { useNews } from '../../contexts/NewsProvider';
import { INewsFilter, TNewsPaper, TTimeRange, TVisualize } from '../../types';
import { Button } from '../elements/Button';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 0.5rem 2rem;
  justify-content: flex-start;
  align-items: stretch;
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

    span {
      font-size: 0.75em;
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

  input[type='checkbox'] {
    position: relative;
    appearance: none;
    background-color: var(--color-card);
    margin: 0 0.25em 0 0;
    color: currentColor;
    width: 1em;
    height: 1em;
    border: 1px solid currentColor;
    border-radius: 0.15em;

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background-color: black;
      transform: scale(0);
      transition: transform 0.1s ease-in-out;
    }

    &:checked::before {
      transform: scale(1);
    }
  }

  input[type='radio'] {
    position: relative;
    appearance: none;
    background-color: var(--color-card);
    margin: 0 0.25em 0 0;
    color: currentColor;
    width: 1em;
    height: 1em;
    border: 1px solid currentColor;
    border-radius: 0.15em;

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background-color: black;
      transform: scale(0);
      transition: transform 0.1s ease-in-out;
    }

    &:checked::before {
      transform: scale(1);
    }
  }

  &.closed {
    opacity: 0;
    max-height: 0;
    padding: 0;
    transition: max-height 0.2s cubic-bezier(0, 1, 0, 1);
  }

  @media (max-width: 600px) {
    padding: 0.25rem 1rem;
    flex-direction: column;
    h3 {
      font-size: 1rem;
      margin-block-start: 0.25rem;
      margin-block-end: 0.25rem;
    }
  }
`;

const KeywordWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;

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
  setOpen: (open: boolean) => void;
}

export const Menu = ({ open, setOpen }: IMenuProps): JSX.Element => {
  const { isError, isLoading, newsAPI } = useNews();
  const { filter, setFilter } = useFilter();
  const [localFilter, setLocalFilter] = useState<INewsFilter>();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
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

  const handleTimeRangeChange = (value: string) => {
    localFilter &&
      setLocalFilter({
        ...localFilter,
        timerange: parseInt(value, 10) as TTimeRange,
      });
  };
  const handleVisualizeChange = (value: string) => {
    localFilter &&
      setLocalFilter({
        ...localFilter,
        visualize: value as TVisualize,
      });
  };

  const handleApplyChangesAndClose = () => {
    localFilter && setFilter(localFilter);
    setOpen(false);
  };

  const handleRegretChangesAndClose = () => {
    setLocalFilter(filter);
    setOpen(false);
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
        <label>
          <input
            type='radio'
            name='timerange'
            id='2'
            value='2'
            checked={localFilter?.timerange === 2}
            onChange={(event) => handleTimeRangeChange(event.target.value)}
          />
          Senaste
        </label>
        <label>
          <input
            type='radio'
            name='timerange'
            id='120'
            value='120'
            checked={localFilter?.timerange === 120}
            onChange={(event) => handleTimeRangeChange(event.target.value)}
          />
          2 tim
        </label>
        <label>
          <input
            type='radio'
            name='timerange'
            id='360'
            value='360'
            checked={localFilter?.timerange === 360}
            onChange={(event) => handleTimeRangeChange(event.target.value)}
          />
          6 tim
        </label>
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
        <h3>Visning</h3>
        <label>
          <input
            type='radio'
            name='visualize'
            value='newspaper'
            checked={localFilter?.visualize === 'newspaper'}
            onChange={(event) => handleVisualizeChange(event.target.value)}
          />
          Tidningar
        </label>
        <label>
          <input
            type='radio'
            name='visualize'
            value='cloud'
            checked={localFilter?.visualize === 'cloud'}
            onChange={(event) => handleVisualizeChange(event.target.value)}
          />
          Ordmoln (engelska)
        </label>
        <label>
          <input
            type='radio'
            name='visualize'
            value='sentiment'
            checked={localFilter?.visualize === 'sentiment'}
            onChange={(event) => handleVisualizeChange(event.target.value)}
          />
          Sentiment (engelska)
        </label>
      </div>
      <div>
        <h3>Tillämpa?</h3>
        <Button onClick={() => handleApplyChangesAndClose()}>Tillämpa</Button>
        <Button alert onClick={() => handleRegretChangesAndClose()}>
          Ångra
        </Button>
      </div>
    </Wrapper>
  );
};
