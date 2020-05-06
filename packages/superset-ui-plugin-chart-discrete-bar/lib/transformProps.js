"use strict";

exports.__esModule = true;
exports.default = transformProps;

function transformProps(chartProps) {
  const {
    width,
    height,
    formData,
    queryData
  } = chartProps;
  const {
    bottomMargin,
    colorPicker,
    colorScheme,
    leftMargin,
    showBarValue,
    orderBars,
    showLegend,
    xTicksLayout,
    yAxisFormat
  } = formData;
  const {
    data
  } = queryData;
  return {
    width,
    height,
    data,
    baseColor: colorPicker,
    bottomMargin,
    colorScheme,
    leftMargin,
    showBarValue,
    orderBars,
    showLegend,
    xTicksLayout,
    yAxisFormat
  };
}