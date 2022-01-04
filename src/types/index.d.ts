export type TNewsPaper =
  | 'SVD'
  | 'Aftonbladet'
  | 'Sydsvenskan'
  | 'GP'
  | 'DN'
  | 'Expressen'
  | 'WSJ'
  | 'Guardian';

export interface IHeadlines {
  newspaper: TNewsPaper;
  date: Date;
  headlines: {
    headline: string;
    url: string;
  }[];
}

export type TTimeRange = 2 | 120 | 720;

export type TVisualize = 'newspaper' | 'cloud';

export interface INewsFilter {
  newspapers: TNewsPaper[];
  keywords: string[];
  timerange: TTimeRange;
  visualize: TVisualize;
}
