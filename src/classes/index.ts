import { IHeadlines, INewsFilter, TNewsPaper } from '../types';

class NewsAPI {
  public news: IHeadlines[];

  constructor(news: IHeadlines[]) {
    this.news = news;
  }

  public latestNews = (): IHeadlines[] => {
    const latestDate = this.news[this.news.length - 1].date;

    const results = sortNews(
      [...this.news].filter((item) => item.date === latestDate)
    );

    return results;
  };

  public filteredNews = (filter: INewsFilter): IHeadlines[] => {
    const results = filterNews(this.latestNews(), filter);
    return results;
  };

  public latestUpdate = (): Date => {
    const latestDate = this.news[this.news.length - 1].date;
    return new Date(latestDate);
  };

  public newspapers = (): TNewsPaper[] => {
    const results = new Set<TNewsPaper>();

    this.news.forEach((item) => {
      results.add(item.newspaper);
    });

    return [...results];
  };
}

const sortNews = (news: IHeadlines[]): IHeadlines[] => {
  const results = [...news].sort((a, b) => {
    if (a.newspaper < b.newspaper) return -1;
    if (a.newspaper > b.newspaper) return 1;
    return 0;
  });

  return results;
};

/**
 * This Function has a few problems:
 * 1. It assumes that the news array only includes ONE instance of each newspaper. This is a problem once we start collecting news over time.
 * 2. It is likely error prone...
 * 3. It assumes all keywords are in lower case (this should be assured by the Menu in the front-end )
 */

const filterNews = (news: IHeadlines[], filter: INewsFilter): IHeadlines[] => {
  //Filter out the newspapers
  var results = [...news].filter((item) =>
    filter.newspapers?.includes(item.newspaper)
  );

  // If there are keywords present in the filter, filter the headlines

  if (filter.keywords.length > 0) {
    var temp: IHeadlines[] = [];

    results.forEach((newspaper) => {
      const headlines = newspaper.headlines.filter((headline) =>
        filter.keywords.some((keyword) =>
          headline.headline.toLowerCase().includes(keyword)
        )
      );

      temp.push({
        newspaper: newspaper.newspaper,
        date: newspaper.date,
        headlines: headlines,
      });
    });

    return temp;
  }

  return results;
};

export { NewsAPI };
