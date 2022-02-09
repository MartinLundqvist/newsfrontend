import { DateTime } from 'luxon';

export const axisPointerLabelFormatter = (params: any): string => {
  const axis = params.axisDimension;

  if (axis === 'y') {
    if (params.axisIndex === 0) {
      return (params.value as number).toLocaleString();
    }

    return (params.value as number).toLocaleString();
  }

  const dateString = DateTime.fromISO(params.value).toLocaleString();

  return dateString;
};
