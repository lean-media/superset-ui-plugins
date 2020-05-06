import _pt from "prop-types";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import _ from 'lodash';
import React from 'react';
import { CategoricalColorNamespace } from '@superset-ui/color';
import { getNumberFormatter } from '@superset-ui/number-format';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
import { scaleBand, scaleLinear } from '@vx/scale';
import { Text } from '@vx/text';
const {
  getScale
} = CategoricalColorNamespace;
export default class DiscreteBarChart extends React.PureComponent {
  getColor(value, colorScheme) {
    const colorFn = getScale(colorScheme);
    return colorFn(value.trim());
  }

  render() {
    const {
      height,
      width,
      colorScheme,
      showBarValue,
      orderBars,
      xTicksLayout,
      yAxisFormat
    } = this.props;
    let {
      data
    } = this.props; // Layout for x ticks

    let tickAngle = 0;
    let tickMargin = 0;
    let tickAnchor = 'middle';

    if (xTicksLayout === 'auto' || xTicksLayout === '45°') {
      tickAngle = 45;
      tickMargin = 100;
      tickAnchor = 'start';
    }

    const margin = {
      top: 30,
      bottom: 30 + tickMargin,
      left: 75,
      right: 20
    };
    const formatter = getNumberFormatter(yAxisFormat);

    if (orderBars) {
      data = _.orderBy(data, ['key', 'asc']);
    } // Then we'll create some bounds


    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom; // We'll make some helpers to get at the data we want

    const x = d => d.key;

    const y = d => d.value; // And then scale the graph by our data


    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.1
    });
    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [0, Math.max(...data.map(y))]
    }); // Compose together the scale and accessor functions to get point functions

    const compose = (scale, accessor) => data => scale(accessor(data));

    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);
    return /*#__PURE__*/React.createElement("svg", {
      width: width,
      height: height
    }, /*#__PURE__*/React.createElement(Group, {
      top: margin.top,
      left: margin.left
    }, /*#__PURE__*/React.createElement(Grid, {
      xScale: xScale // @ts-ignore
      ,
      yScale: yScale,
      width: xMax,
      height: yMax,
      numTicksRows: 5
    }), /*#__PURE__*/React.createElement(AxisLeft, {
      scale: yScale,
      top: 0,
      left: 0,
      hideTicks: true,
      numTicks: 5 // @ts-ignore
      ,
      tickFormat: formatter,
      tickLabelProps: (tickValue, index) => {
        return {
          fontFamily: 'Arial,sans-serif',
          fontSize: 12,
          textAnchor: 'end'
        };
      }
    }), /*#__PURE__*/React.createElement(AxisBottom, {
      scale: xScale,
      top: yMax,
      stroke: '#1b1a1e',
      hideAxisLine: true,
      hideTicks: true,
      tickLabelProps: (tickValue, index) => {
        return {
          fontFamily: 'Arial,sans-serif',
          fontSize: 12,
          textAnchor: tickAnchor,
          angle: tickAngle
        };
      }
    }), /*#__PURE__*/React.createElement(Group, null, data.map((d, i) => {
      const barHeight = yMax - yPoint(d);
      return /*#__PURE__*/React.createElement("g", {
        key: d.key
      }, /*#__PURE__*/React.createElement(Bar, {
        x: xPoint(d),
        y: yMax - barHeight,
        height: barHeight,
        width: xScale.bandwidth() // fill={color(xPoint(d))}
        ,
        fill: this.getColor(x(d), colorScheme)
      }), showBarValue && /*#__PURE__*/React.createElement(Text, {
        x: xPoint(d) + xScale.bandwidth() / 2,
        y: yMax - barHeight - 10,
        textAnchor: "middle",
        style: {
          fontFamily: 'Arial,sans-serif',
          fontSize: 12,
          textAnchor: 'middle'
        }
      }, formatter(d.value)));
    }))));
  }

}

_defineProperty(DiscreteBarChart, "propTypes", {
  height: _pt.number.isRequired,
  width: _pt.number.isRequired,
  colorScheme: _pt.string.isRequired,
  data: _pt.arrayOf(_pt.shape({
    key: _pt.string.isRequired,
    value: _pt.number.isRequired
  })).isRequired,
  showBarValue: _pt.bool.isRequired,
  orderBars: _pt.bool.isRequired,
  showLegend: _pt.bool.isRequired,
  xTicksLayout: _pt.string.isRequired,
  yAxisFormat: _pt.string.isRequired
});