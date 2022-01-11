import { createContext, useContext, useEffect, useState } from 'react';
import { INewsFilter } from '../types';
import { useLocalStorage } from '../utils/useLocalStorage';
import { validate } from '../utils/validateFilter';

interface IFilterProvider {
  filter: INewsFilter;
  setFilter: (filter: INewsFilter) => void;
}

// TODO: Replace this with a programmatic setting to all newspapers
const initialFilter: INewsFilter = {
  newspapers: [
    'Aftonbladet',
    'DN',
    'Expressen',
    'GP',
    'SVD',
    'Sydsvenskan',
    'Guardian',
    'WSJ',
  ],
  keywords: [],
  timerange: 2,
  visualize: 'newspaper',
};

const FilterContext = createContext<IFilterProvider>({} as IFilterProvider);

const useFilter = () => useContext(FilterContext);

interface IFilterProviderProps {
  children: React.ReactNode;
}

const FilterProvider = ({ children }: IFilterProviderProps): JSX.Element => {
  const [filter, setFilter] = useLocalStorage<INewsFilter>(
    'newsscraper_filter',
    initialFilter
  );

  useEffect(() => {
    !validate(filter) && setFilter(initialFilter);
  }, [filter]);

  return (
    <FilterContext.Provider
      value={{
        filter,
        setFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterProvider, useFilter };
