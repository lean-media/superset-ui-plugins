"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _color = require("@superset-ui/color");

var _numberFormat = require("@superset-ui/number-format");

var _axis = require("@vx/axis");

var _grid = require("@vx/grid");

var _group = require("@vx/group");

var _shape = require("@vx/shape");

var _scale = require("@vx/scale");

var _text = require("@vx/text");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  getScale
} = _color.CategoricalColorNamespace;

class DiscreteBarChart extends _react.default.PureComponent {
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
    const formatter = (0, _numberFormat.getNumberFormatter)(yAxisFormat);

    if (orderBars) {
      data = _lodash.default.orderBy(data, ['key', 'asc']);
    } // Then we'll create some bounds


    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom; // We'll make some helpers to get at the data we want

    const x = d => d.key;

    const y = d => d.value; // And then scale the graph by our data


    const xScale = (0, _scale.scaleBand)({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.1
    });
    const yScale = (0, _scale.scaleLinear)({
      rangeRound: [yMax, 0],
      domain: [0, Math.max(...data.map(y))]
    }); // Compose together the scale and accessor functions to get point functions

    const compose = (scale, accessor) => data => scale(accessor(data));

    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);
    return /*#__PURE__*/_react.default.createElement("svg", {
      width: width,
      height: height
    }, /*#__PURE__*/_react.default.createElement(_group.Group, {
      top: margin.top,
      left: margin.left
    }, /*#__PURE__*/_react.default.createElement(_grid.Grid, {
      xScale: xScale // @ts-ignore
      ,
      yScale: yScale,
      width: xMax,
      height: yMax,
      numTicksRows: 5
    }), /*#__PURE__*/_react.default.createElement(_axis.AxisLeft, {
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
    }), /*#__PURE__*/_react.default.createElement(_axis.AxisBottom, {
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
    }), /*#__PURE__*/_react.default.createElement(_group.Group, null, data.map((d, i) => {
      const barHeight = yMax - yPoint(d);
      return /*#__PURE__*/_react.default.createElement("g", {
        key: d.key
      }, /*#__PURE__*/_react.default.createElement(_shape.Bar, {
        x: xPoint(d),
        y: yMax - barHeight,
        height: barHeight,
        width: xScale.bandwidth() // fill={color(xPoint(d))}
        ,
        fill: this.getColor(x(d), colorScheme)
      }), showBarValue && /*#__PURE__*/_react.default.createElement(_text.Text, {
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

exports.default = DiscreteBarChart;

_defineProperty(DiscreteBarChart, "propTypes", {
  height: _propTypes.default.number.isRequired,
  width: _propTypes.default.number.isRequired,
  colorScheme: _propTypes.default.string.isRequired,
  data: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string.isRequired,
    value: _propTypes.default.number.isRequired
  })).isRequired,
  showBarValue: _propTypes.default.bool.isRequired,
  orderBars: _propTypes.default.bool.isRequired,
  showLegend: _propTypes.default.bool.isRequired,
  xTicksLayout: _propTypes.default.string.isRequired,
  yAxisFormat: _propTypes.default.string.isRequired
});