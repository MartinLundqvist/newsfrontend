import { useEffect, useState } from 'react';
import styled from 'styled-components';
import EChartWrapper from './EChartWrapper';
import { useAnalyses } from '../../hooks/useAnalyses';
import { createNewChartConfig } from '../../utils/createChartConfig';
import { MARKET_DATA } from '../../constants/marketData';
import { useFilter } from '../../contexts/FilterProvider';
import { TMarketSymbol } from '../../types';
import { sentimentTooltip } from '../../constants/sentimentTooltip';

const Page = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem 2rem;

  @media (max-width: 700px) {
    padding: 0.25rem 1rem;
  }
`;

const Wrapper = styled.div`
  position: relative;
  padding: 0.5rem 2rem;
  box-shadow: 0px 5px 5px 0px hsla(0, 0%, 0%, 0.25);
  background-color: var(--color-card);

  @media (max-width: 700px) {
    padding: 0.5rem 0.5rem;
  }
`;

const ChoiceContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: baseline;
  gap: 1rem;
  font-family: 'Bebas Neue', cursive;

  h3 {
    margin-block-start: 0.5rem;
    margin-block-end: 0.5rem;
    margin-right: auto;
    text-align: right;
  }

  .tooltip {
    position: relative;
    cursor: pointer;

    &:hover .tooltip--text {
      visibility: visible;
    }

    .tooltip--text {
      visibility: hidden;
      position: absolute;
      top: calc(100% + 1rem);
      left: -20ch;
      width: 50ch;
      text-align: left;
      padding: 0.5rem 2rem;
      box-shadow: 0px 5px 5px 0px hsla(0, 0%, 0%, 0.25);
      background-color: var(--color-card);
      padding: 1rem;
      z-index: 1;

      @media (max-width: 700px) {
        width: 40ch;
        left: -20ch;
      }
    }
  }

  label {
    display: block;
  }

  select {
    border: 1px solid black;
    border-radius: 3px;
    padding: 0.25rem 0.25rem;
    min-width: 8ch;
    margin-left: 0.5rem;
    font-family: inherit;
    font-style: inherit;
    font-size: inherit;
    color: inherit;

    &:focus,
    &:hover {
      outline: none;
      background-color: var(--color-bg);
    }
  }

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const ChartContainer = styled.div`
  position: relative;
  padding-top: 1rem;
  width: 100%;
  height: 600px;
`;

const Sentiment = (): JSX.Element => {
  const { analyses } = useAnalyses();
  const { filter, setFilter } = useFilter();
  const [config, setConfig] = useState<any>({});
  const [market, setMarket] = useState<string>('^DJI');
  const [hideWeekends, setHideWeekends] = useState<boolean>(true);

  useEffect(() => {
    setMarket(filter.marketSymbol);
    setHideWeekends(filter.hideWeekends);
  }, []);

  useEffect(() => {
    if (analyses) {
      setConfig(createNewChartConfig(analyses, market, hideWeekends));
    }
  }, [analyses, market, hideWeekends]);

  const handleMarketChange = (newMarket: string) => {
    setMarket(newMarket);
    setFilter({ ...filter, marketSymbol: newMarket as TMarketSymbol });
  };

  const handleHideToggle = (hide: string) => {
    setHideWeekends(hide === 'hide');
    setFilter({ ...filter, hideWeekends: hide === 'hide' });
  };

  return (
    <Page>
      <Wrapper>
        <ChoiceContainer>
          <h3>
            Marknad och sentiment{' '}
            <span className='tooltip'>
              &#9432;
              <div className='tooltip--text'>{sentimentTooltip}</div>
            </span>
          </h3>
          <label>
            Marknad:
            <select
              name='marketdata'
              onChange={(event) => handleMarketChange(event.target.value)}
              value={market}
            >
              {MARKET_DATA.map((marketOption) => (
                <option key={marketOption.symbol} value={marketOption.symbol}>
                  {marketOption.market}
                </option>
              ))}
            </select>
          </label>
          <label>
            Visa helger?
            <select
              name='hideweekends'
              onChange={(event) => handleHideToggle(event.target.value)}
              value={hideWeekends ? 'hide' : 'show'}
            >
              <option value='hide'>Nej</option>
              <option value='show'>Ja</option>
            </select>
          </label>
        </ChoiceContainer>
        <ChartContainer>
          <EChartWrapper option={config} />
        </ChartContainer>
      </Wrapper>
    </Page>
  );
};

export default Sentiment;
