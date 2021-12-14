export type TNewsPaper =
  | 'SVD'
  | 'Aftonbladet'
  | 'Sydsvenskan'
  | 'GP'
  | 'DN'
  | 'Expressen';

export interface IHeadlines {
  newspaper: TNewsPaper;
  date: Date;
  headlines: {
    headline: string;
    url: string;
  }[];
}

export interface INewsFilter {
  newspapers: TNewsPaper[];
  keywords: string[];
}
