/**
 * These are the symbols of the markets that are fetched:
 * ^FCHI,^STOXX50E,^DJI,EURUSD=X,GC=F,BTC-EUR,^CMC200,CL=F,^GDAXI,^FTSE,^IXIC,^GSPC,^N225,^HSI,GBPUSD=X
 */

import { TMarketSymbol } from '../types';

interface IMarket {
  symbol: TMarketSymbol;
  market: string;
}

export const MARKET_DATA: IMarket[] = [
  { symbol: '^DJI', market: 'Dow Jones - DJI' },
  { symbol: '^FCHI', market: 'Paris - CAC 40' },
  { symbol: '^STOXX50E', market: 'Zurich - Euro Stoxx 50' },
  { symbol: 'EURUSD=X', market: 'CCY - EUR/USD' },
  { symbol: 'GC=F', market: 'Commodities - COMEX' },
  { symbol: 'BTC-EUR', market: 'CCC - BTC/EUR' },
  { symbol: '^CMC200', market: 'CMC Crypto 200' },
  { symbol: 'CL=F', market: 'NY Mercantile' },
  { symbol: '^FTSE', market: 'FTSE Index' },
  { symbol: '^IXIC', market: 'Nasdaq GIDS' },
  { symbol: '^GSPC', market: 'S&P 500' },
  { symbol: '^N225', market: 'Osaka - Nikkei 225' },
  { symbol: '^HSI', market: 'Hong Kong - HKSE' },
  { symbol: 'GBPUSD=X', market: 'CCY - GBP/USD' },
  { symbol: '^GDAXI', market: 'DAX PI - XETRA' },
];
