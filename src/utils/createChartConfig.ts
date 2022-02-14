import { EChartsOption } from 'echarts';
import { DateTime } from 'luxon';
import { createDataSet } from './createChartDataSet';
import { createTooltipPosition } from './createChartTooltipPosition';
import { IAnalysis } from '../types';
import { createTooltipFormatter } from './createChartTooltipFormatter';
import { axisPointerLabelFormatter } from './createChartAxisLabelFormatter';
import { TOOLTIP_FONTSIZE_IN_REM } from '../constants/charting';

export const createNewChartConfig = (
  analysis: IAnalysis[],
  symbol: string,
  hideWeekends: boolean
): EChartsOption => {
  const extraCssText = `
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    white-space: normal;
    gap: 0.25rem;
    width: 30rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    font-family: 'Bebas Neue', cursive;
    font-size: ${TOOLTIP_FONTSIZE_IN_REM}rem;
    opacity: 0.75;
    border-radius: 0;
    color: var(--color-text);

  `;

  const extraCssText_narrow = `
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    white-space: normal;
    gap: 0.25rem;
    width: 15rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    font-family: 'Bebas Neue', cursive;
    font-size: ${TOOLTIP_FONTSIZE_IN_REM}rem;
    opacity: 0.75;
    border-radius: 0;
    color: var(--color-text);

  `;

  const baseConfig: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      position: (point, params, dom, rect, size) =>
        createTooltipPosition(point, params, dom, rect, size),
      formatter: (params) => createTooltipFormatter(params, analysis),
      extraCssText: extraCssText_narrow,
      confine: true,
    },
    media: [
      {
        query: {
          minWidth: 600,
        },
        option: {
          tooltip: {
            extraCssText: extraCssText,
          },
        },
      },
    ],
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
        left: 'auto',
        containLabel: true,
      },
      {
        top: '62%',
        right: '0%',
        bottom: '2%',
        left: 'auto',
        containLabel: true,
      },
    ],
    dataset: {
      source: createDataSet(analysis, symbol, hideWeekends),
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
        scale: true,
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

  return baseConfig;
};
