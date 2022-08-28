import { IHeadlines, INewsFilter, TNewsPaper } from '../types';

class NewsAPI {
  public news: IHeadlines[];

  constructor(news: IHeadlines[]) {
    this.news = news;
  }

  public count = () => {
    var count = 0;

    this.news.forEach((item) => {
      count += item.headlines.length;
    });

    return count;
  };

  public latestNews = (): IHeadlines[] => {
    var results: IHeadlines[] = [];

    //For each newspaper
    this.newspapers().forEach((paper) => {
      // Create a temp array of all such headlines
      const temp = this.news.filter((thisNewsitem) => {
        return thisNewsitem.newspaper === paper;
      });

      // console.log(temp);
      //And add that array to the final results
      // results.push(temp[temp.length - 1]);
      // console.log(
      //   '---- forEach(paper) is now at paper === ' +
      //     paper +
      //     ' and the temp array is:'
      // );
      // console.log(temp);
      results.push(temp[0]);
    });

    // console.log('REsults from the latestNews are....');
    // console.log(results);

    return results;
  };

  public filteredNews = (filter: INewsFilter): IHeadlines[] => {
    // If "latest news" is chosen, we use the latestNews function to gather the latest entries. So it's not really "2 minutes".
    if (filter.timerange === 2) {
      // console.log('2 minutes');
      return filterNews(this.latestNews(), filter);
    }

    // console.log('Not 2 minutes');

    // If not, we timestrip the news
    const results = timeStripNews(this.news, filter);

    return flattenNews(filterNews(results, filter));
  };

  public latestUpdate = (): Date => {
    // const latestDate = this.news[this.news.length - 1].date;
    const latestDate = this.news[0].date;
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

const flattenNews = (news: IHeadlines[]): IHeadlines[] => {
  var results: IHeadlines[] = [];

  //for each headline

  news.forEach((newsHeadline) => {
    results;
    //Do we already have an object in the results array for this newspaper?
    if (
      results.findIndex(
        (result) => result.newspaper === newsHeadline.newspaper
      ) === -1
    ) {
      //If not, add it to the results array
      results.push(newsHeadline);
    }

    //Then, for each headline.headline
    newsHeadline.headlines.forEach((newsHeadlineItem) => {
      // Fetch the right object in our results array
      const resultsheadline = results.find(
        (item) => item.newspaper === newsHeadline.newspaper
      ); // This should exist now

      //Do we already have an object for this headline in the array?
      if (
        resultsheadline?.headlines.findIndex(
          (row) => row.headline === newsHeadlineItem.headline
        ) === -1
      ) {
        //If not, add it to the results array
        resultsheadline.headlines.push(newsHeadlineItem);
      }
    });
  });

  return results;
};

// const sortNews = (news: IHeadlines[]): IHeadlines[] => {
//   const results = [...news].sort((a, b) => {
//     if (a.newspaper < b.newspaper) return -1;
//     if (a.newspaper > b.newspaper) return 1;
//     return 0;
//   });

//   return results;
// };

/**
 * This Function has a few problems:
 * 1. It assumes that the news array only includes ONE instance of each newspaper. This is a problem once we start collecting news over time.
 * 2. It is likely error prone...
 * 3. It assumes all keywords are in lower case (this should be assured by the Menu in the front-end )
 */

const filterNews = (news: IHeadlines[], filter: INewsFilter): IHeadlines[] => {
  //Filter out the newspapers of interest
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

const timeStripNews = (
  news: IHeadlines[],
  filter: INewsFilter
): IHeadlines[] => {
  //Filter out the headlines according to the time horizon set
  const newerThanDate = new Date();
  newerThanDate.setMinutes(newerThanDate.getMinutes() - filter.timerange);

  // console.log(newerThanDate);

  var results = [...news].filter((headline) => {
    const headlineDate = new Date(headline.date);
    return headlineDate.getTime() >= newerThanDate.getTime();
  });

  return results;
};

export { NewsAPI };
