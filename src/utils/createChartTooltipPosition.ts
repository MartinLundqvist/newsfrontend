import { TOOLTIP_HEADING_FONTSIZE_IN_REM } from '../constants/charting';

type TSize = {
  contentSize: [number, number];
  viewSize: [number, number];
};

export const createTooltipPosition = (
  point: [number, number],
  params: any,
  dom: any,
  rect: any,
  size: TSize
): [number, number] => {
  /// As a small helper we need to figure out what a REM is in the current browser, and the create a string.
  const documentFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  const viewWidth = size.viewSize[0];
  const tooltipWidth = size.contentSize[0];
  const padding = documentFontSize * (TOOLTIP_HEADING_FONTSIZE_IN_REM + 1);
  const posX =
    point[0] > viewWidth / 2 ? padding : viewWidth - tooltipWidth - padding;
  const posY = padding;

  return [posX, posY];
};
