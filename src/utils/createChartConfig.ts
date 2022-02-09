import {
  EChartsOption,
  TooltipComponentOption,
  DatasetComponentOption,
} from 'echarts';
import { DateTime } from 'luxon';
import { IAnalysis } from '../types';

const NO_HEADLINES_TO_SHOW = 5;
const TOOLTIP_HEADING_FONTSIZE_IN_REM = 1;
const TOOLTIP_FONTSIZE_IN_REM = 0.9;
const TOOLTIP_PADDING_IN_REM = 0.25;

export const createNewChartConfig = (
  analysis: IAnalysis[],
  symbol: string,
  hideWeekends: boolean
): EChartsOption => {
  // Set the default options for the chart
  /// As a small helper we need to figure out what a REM is in the current browser, and the create a string.
  const documentFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  const fontSize = (documentFontSize * TOOLTIP_FONTSIZE_IN_REM).toString();
  const headingFontSize = (
    documentFontSize * TOOLTIP_HEADING_FONTSIZE_IN_REM
  ).toString();
  const padding = documentFontSize * TOOLTIP_PADDING_IN_REM;

  const extraCssText = `
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    white-space: normal;
    gap: 0.25rem;
    width: 25rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    font-family: 'Bebas Neue', cursive;
    opacity: 0.75;
    border-radius: 0;

  `;

  const baseConfig: EChartsOption = {
    // title: {
    //   text: 'Marknad och sentiment',
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      padding: padding,
      textStyle: {
        color: 'rgb(0, 0, 0)',
        fontSize: fontSize,
      },
      extraCssText: extraCssText,
      confine: true,
    },
    legend: {
      orient: 'horizontal',
      right: 0,
      top: 'top',
    },
    grid: [
      {
        top: '2%',
        right: '0%',
        bottom: '42%',
        left: '0%',
        containLabel: true,
      },
      {
        top: '62%',
        right: '0%',
        bottom: '0%',
        left: '0%',
        containLabel: true,
      },
    ],
    dataset: {
      source: [],
      sourceHeader: true,
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: 'all',
        },
      ],
      label: {
        backgroundColor: '#777',
        formatter: (params) => axisPointerLabelFormatter(params),
      },
    },
    xAxis: [
      {
        show: false,
        gridIndex: 0,
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
      },
      {
        gridIndex: 1,
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          formatter: (value: any) => {
            const date = DateTime.fromISO(value).toLocal();
            return date.toLocaleString();
          },
          rotate: 45,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        position: 'left',
        gridIndex: 0,
      },
      {
        type: 'value',
        max: 1,
        min: -1,
        position: 'left',
        gridIndex: 1,
      },
    ],
    visualMap: [
      {
        show: false,
        type: 'continuous',
        seriesIndex: 1,
        min: -1,
        max: 1,
        color: ['green', 'orange', 'red'],
      },
    ],
    series: [
      {
        type: 'line',
        encode: {
          x: 'date',
          y: 'close',
        },
        smooth: true,
        xAxisIndex: 0,
        yAxisIndex: 0,
      },
      {
        type: 'line',
        encode: {
          x: 'date',
          y: 'sentiment',
        },
        smooth: true,
        xAxisIndex: 1,
        yAxisIndex: 1,
      },
    ],
  };

  const axisPointerLabelFormatter = (params: any): string => {
    const axis = params.axisDimension;

    if (axis === 'y') {
      if (params.axisIndex === 0) {
        return Math.floor(params.value as number).toLocaleString();
      }

      return (params.value as number).toLocaleString();
    }

    const dateString = DateTime.fromISO(params.value).toLocaleString();

    return dateString;
  };

  // Not happy with the any[][] type...
  const createDataSet = (data: IAnalysis[], symbol: string): any[][] => {
    const results: any[][] = [['date', 'close', 'sentiment']];

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
        results.push([timestamp.toString(), price, sentiment]);
      }
    });

    // results.shift(); // Duh... Inelegant,but needs to be done...

    // console.log(results);

    return results;
  };

  (baseConfig.dataset as DatasetComponentOption).source = createDataSet(
    analysis,
    symbol
  );

  //Add tooltip position
  (baseConfig.tooltip as TooltipComponentOption).position = (
    point,
    params,
    dom,
    rect,
    size
  ) => {
    const viewWidth = size.viewSize[0];
    const tooltipWidth = size.contentSize[0];
    const padding = documentFontSize * (TOOLTIP_HEADING_FONTSIZE_IN_REM + 1);
    const posX =
      point[0] > viewWidth / 2 ? padding : viewWidth - tooltipWidth - padding;
    const posY = padding;

    return [posX, posY];
  };

  //Add the custom tooltip formatter
  //TODO: This is a performance nightmare waiting to happen. Need to somehow create this ONCE rather than everytime the tooltip triggers.
  (baseConfig.tooltip as TooltipComponentOption).formatter = (params) => {
    //Bit of a nasty piece of code, but we need to compare the date strings between the chart data point and the analyses entries to find some headlines
    const callbackParams = Object.values(params)[0]; // This little trick is to avoid Typescript going nuts since 'params' type is defined as both a flat object AND an array in eCharts.
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
      ].share_of_total.toLocaleString()}) </div> `;
    }
    // console.log(callbackParams);

    const sentiment = (callbackParams.data[2] as number).toPrecision(2);

    return `<div style="font-size: ${headingFontSize}px">${DateTime.fromISO(
      callbackParams.axisValueLabel
    ).toLocaleString()}: Sentiment ${sentiment}</div> ${headlinesString}`;
  };

  // console.log(baseConfig);

  return baseConfig;
};
