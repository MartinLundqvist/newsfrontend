import { DateTime } from 'luxon';
import { IAnalysis } from '../types';

export const createDataSet = (
  data: IAnalysis[],
  symbol: string,
  hideWeekends: boolean
): any[][] => {
  const results: any[][] = [['date', 'close', 'sentiment', 'headlines']];

  // Let's sort the data first, since we are using category axis rather than time axis (to get rid of weekends)

  data.sort((a, b) => {
    return a.date < b.date ? -1 : 1;
  });

  const weekendLimiter = hideWeekends ? 6 : 8;

  data.forEach((entry) => {
    const marketData = entry.market_data;
    const timestamp = DateTime.fromISO(entry.date).toLocal();
    if (timestamp.weekday < weekendLimiter) {
      const value = marketData.data.find((md) => md.symbol === symbol);
      const price = value?.price ?? null;
      const sentiment = entry.average_sentiment;
      const headlines = entry.headlines;
      results.push([timestamp.toString(), price, sentiment, headlines]);
    }
  });

  return results;
};
