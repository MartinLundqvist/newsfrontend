import {
  NO_HEADLINES_TO_SHOW,
  TOOLTIP_HEADING_FONTSIZE_IN_REM,
} from '../constants/charting';
import { IHeadlineEntry } from '../types';

export const createTooltipFormatter = (params: any): string => {
  const callbackParams: any = Object.values(params)[0]; // Access the first grid's params, as an Array.
  var headlines = callbackParams.data[3] as IHeadlineEntry[];

  // Only keep the english ones
  headlines = headlines.filter((headline) => {
    return headline.language === 'en';
  });

  // Then we format the headlines string.
  var headlinesString = '';

  for (let i = 0; i < NO_HEADLINES_TO_SHOW; i++) {
    headlinesString += `
      <div style="position: relative; display: block; left: 3px; width: calc(100% - 6px); height: 1px; background-color: hsla(0, 0%, 0%, 0.25);"></div>
      <a class="tooltipstyle" href="${headlines[i].url}" target="_blank">${
      headlines[i].headline
    } (${headlines[i].sentiment.toLocaleString()}) </a> `;
  }

  const documentFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  const headingFontSize = (
    documentFontSize * TOOLTIP_HEADING_FONTSIZE_IN_REM
  ).toString();

  const sentiment = (callbackParams.data[2] as number).toLocaleString();

  return `<div style="font-size: ${headingFontSize}px">${callbackParams.axisValueLabel}: Sentiment ${sentiment}</div> ${headlinesString}`;
};
