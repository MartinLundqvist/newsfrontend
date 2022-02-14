import { DateTime } from 'luxon';
import {
  NO_HEADLINES_TO_SHOW,
  TOOLTIP_HEADING_FONTSIZE_IN_REM,
} from '../constants/charting';
import { IAnalysis } from '../types';

// TODO: Gotta find a better typing...
//TODO: This is a performance nightmare waiting to happen. Need to somehow create this ONCE rather than everytime the tooltip triggers.
export const createTooltipFormatter = (
  params: any,
  analysis: IAnalysis[]
): string => {
  //Bit of a nasty piece of code, but we need to compare the date strings between the chart data point and the analyses entries to find some headlines
  const callbackParams: any = Object.values(params)[0]; // This little trick is to avoid Typescript going nuts since 'params' type is defined as both a flat object AND an array in eCharts.
  const date = DateTime.fromISO(callbackParams.axisValue).toMillis();
  const headlines = analysis.find((entry) => {
    return date === DateTime.fromISO(entry.date).toMillis();
  });

  // Then we format the headlines string.
  var headlinesString = '';

  for (let i = 0; i < NO_HEADLINES_TO_SHOW; i++) {
    headlinesString += `
      <div style="position: relative; display: block; left: 3px; width: calc(100% - 6px); height: 1px; background-color: hsla(0, 0%, 0%, 0.25);"></div>
      <div>${headlines?.headlines[i].headline} (${headlines?.headlines[
      i
    ].sentiment.toLocaleString()}) </div> `;
  }

  const documentFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  const headingFontSize = (
    documentFontSize * TOOLTIP_HEADING_FONTSIZE_IN_REM
  ).toString();

  const sentiment = (callbackParams.data[2] as number).toLocaleString();

  return `<div style="font-size: ${headingFontSize}px">${DateTime.fromISO(
    callbackParams.axisValue
  ).toLocaleString()}: Sentiment ${sentiment}</div> ${headlinesString}`;
};
