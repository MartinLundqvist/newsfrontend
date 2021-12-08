import { IHeadlines } from '../types';

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

  public latestUpdate = (): Date => {
    const latestDate = this.news[this.news.length - 1].date;
    return new Date(latestDate);
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

export { NewsAPI };
