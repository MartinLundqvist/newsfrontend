import { createContext, useContext, useEffect, useState } from 'react';
import { NewsAPI } from '../classes';
import { IHeadlines } from '../types';
import { useToasts } from './ToastProvider';
// import { useAlert } from './AlertProvider';

interface INewsProvider {
  newsAPI: NewsAPI | null;
  isLoading: boolean;
  isError: boolean;
}

const NewsContext = createContext<INewsProvider>({} as INewsProvider);

const useNews = () => useContext(NewsContext);

interface INewsProviderProps {
  children: React.ReactNode;
}

const NewsProvider = ({ children }: INewsProviderProps): JSX.Element => {
  const [newsAPI, setNewsAPI] = useState<NewsAPI | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { createToast } = useToasts();

  // Load up the last 720 mins of data. This takes a couple of seconds. So animation will finish first (typically).
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const toDate = new Date();
        var fromDate = new Date(toDate);
        fromDate.setMinutes(fromDate.getMinutes() - 720);

        const apiURL = import.meta.env.VITE_API_URL;

        const results = await fetch(
          `${apiURL}daterange/${fromDate.toISOString()}/${toDate.toISOString()}`
        );
        if (results.ok) {
          const rawData: IHeadlines[] = await results.json();

          const newNewsAPI = new NewsAPI(rawData);

          setNewsAPI(newNewsAPI);
          createToast(
            `Hämtade ${newNewsAPI.count().toLocaleString()} rubriker`
          );
        } else {
          setIsError(true);
          setNewsAPI(null);
          createToast(
            'Fel uppstod när data skulle hämtas: ' +
              JSON.stringify(results.statusText),
            'error'
          );
          // console.log('Error occured ' + JSON.stringify(results));
        }
      } catch (error) {
        createToast(
          'Fel uppstod när data skulle hämtas ' + JSON.stringify(error),
          'error'
        );

        // console.error(JSON.stringify(error));
      } finally {
        setIsLoading(false);
      }
    };

    !newsAPI && fetchNews();
  }, []);

  return (
    <NewsContext.Provider
      value={{
        newsAPI,
        isError,
        isLoading,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export { NewsProvider, useNews };
