export type TNewsPaper =
  | 'SVD'
  | 'Aftonbladet'
  | 'Sydsvenskan'
  | 'GP'
  | 'DN'
  | 'Expressen'
  | 'WSJ'
  | 'Guardian'
  // Below this line are new ones
  | 'WashingtonPost'
  | 'BBC'
  | 'CNN'
  | 'DailyMail'
  | 'NYTimes'
  | 'Yahoo';

export interface IHeadlines {
  newspaper: TNewsPaper;
  date: Date;
  headlines: {
    headline: string;
    url: string;
  }[];
}

export type TTimeRange = 2 | 120 | 360;

export type TVisualize = 'newspaper' | 'cloud' | 'sentiment';

export type TMarketSymbol =
  | '^DJI'
  | '^FCHI'
  | '^STOXX50E'
  | 'EURUSD=X'
  | 'GC=F'
  | 'BTC-EUR'
  | '^CMC200'
  | 'CL=F'
  | '^FTSE'
  | '^IXIC'
  | '^GSPC'
  | '^N225'
  | '^HSI'
  | 'GBPUSD=X'
  | '^GDAXI';

export interface INewsFilter {
  newspapers: TNewsPaper[];
  keywords: string[];
  timerange: TTimeRange;
  visualize: TVisualize;
  marketSymbol: TMarketSymbol;
  hideWeekends: boolean;
}

export type TLanguage = 'en' | 'se';

export interface IHeadlineEntry {
  headline: string;
  url: string;
  language: TLanguage;
  newspaper: TNewsPaper;
  count: number;
  share_of_total: number;
  sentiment: number;
}

export interface IMarketDataPoint {
  market: string;
  symbol: string;
  price: number;
}

export interface IMarketData {
  timestamp: number;
  data: IMarketDataPoint[];
}
export interface IAnalysis {
  date: string;
  count: number;
  unique: number;
  headlines: IHeadlineEntry[];
  market_data: IMarketData;
  average_sentiment: number;
}
