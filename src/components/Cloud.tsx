import WordCloud from 'react-d3-cloud';
import styled from 'styled-components';
import { IHeadlines, TTimeRange } from '../types';
import { useEffect, useState } from 'react';
import stopwords from '../utils/stopwords';
import { useNews } from '../contexts/NewsProvider';
import { useFilter } from '../contexts/FilterProvider';

const Wrapper = styled.div`
  display: block;
  height: 100%;
`;

interface IWords {
  text: string;
  value: number;
}

const fontScaling = {
  2: 30,
  120: 25,
  720: 15,
};

export const Cloud = (): JSX.Element => {
  const { isError, isLoading, newsAPI } = useNews();
  const { filter } = useFilter();
  const [news, setNews] = useState<IHeadlines[]>([]);
  const [words, setWords] = useState<IWords[]>([]);

  useEffect(() => {
    newsAPI && filter && setNews(newsAPI.filteredNews(filter));
  }, [newsAPI, filter]);

  useEffect(() => {
    const parse = async () => {
      var results: string[] = [];

      // First step: Create a big array of words and sort it.

      // Go through each newspaper
      news.forEach((paper) => {
        // Let's only do the english ones
        if (paper.newspaper === 'Guardian' || paper.newspaper === 'WSJ') {
          // Now go through each headline
          paper.headlines.forEach((headline) =>
            // Create an array of words from the headline, and push them to the results array
            results.push(...headline.headline.split(' '))
          );
        }
      });

      // I think this accelerates subsequent parsing, but I'm not sure...

      results.sort();

      // Next step: Remove all stopwords

      results = [...results].filter((word) => {
        // Remove special characters to create a clean word
        const cleanWord = word.replace(
          /[‘`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
          ''
        );

        // then check if the word is a stop word, if not, add it
        return !stopwords.includes(cleanWord.toLowerCase());
      });

      // Final step: Count the instances of each word and create the actual output
      var wordResults: IWords[] = [];
      var prevWord = '';
      var count = 0;

      results.forEach((word) => {
        if (word === prevWord) {
          count += 1;
        } else {
          wordResults.push({
            text: prevWord,
            value: count,
          });
          count = 1;
        }
        prevWord = word;
      });

      // The above algorithm creates a first entry which is { '', 0 }, so we need to remove that

      wordResults.shift();

      // Then sort in descending order of number of instances (value property). This is to scale the font-size properly.

      wordResults.sort((a, b) => {
        return a.value > b.value ? -1 : 1;
      });

      setWords(wordResults);
    };

    news.length > 0 && parse();
  }, [news]);

  if (isError || !newsAPI) {
    return <></>;
  }

  return (
    <Wrapper>
      <WordCloud
        fontSize={(word) =>
          Math.sqrt(word.value) * fontScaling[filter.timerange]
        }
        data={words}
      />
    </Wrapper>
  );
};
