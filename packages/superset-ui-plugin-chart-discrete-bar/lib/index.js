"use strict";

exports.__esModule = true;
exports.default = void 0;

var _translation = require("@superset-ui/translation");

var _chart = require("@superset-ui/chart");

var _transformProps = _interopRequireDefault(require("./transformProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function nonEmpty(v) {
  if (v === null || v === undefined || v === '' || Array.isArray(v) && v.length === 0) {
    return (0, _translation.t)('cannot be empty');
  }

  return false;
}

const metadata = new _chart.ChartMetadata({
  description: '',
  name: (0, _translation.t)('Discrete bar chart'),
  thumbnail: ''
});
const controlPanel = {
  controlPanelSections: [{
    label: (0, _translation.t)('Query'),
    expanded: true,
    controlSetRows: [['metric'], ['adhoc_filters'], ['groupby'], ['row_limit']]
  }, {
    label: (0, _translation.t)('Chart Options'),
    expanded: true,
    controlSetRows: [['color_scheme', 'label_colors'], ['show_bar_value'], ['order_bars'], ['y_axis_format']]
  }, {
    label: (0, _translation.t)('X Axis'),
    expanded: true,
    controlSetRows: [['x_ticks_layout']]
  }],
  controlOverrides: {
    groupby: {
      label: (0, _translation.t)('Series'),
      validators: [nonEmpty]
    }
  }
};

class DiscreteBarChartPlugin extends _chart.ChartPlugin {
  constructor() {
    super({
      controlPanel,
      loadChart: () => Promise.resolve().then(() => _interopRequireWildcard(require('./DiscreteBarChart'))),
      metadata,
      transformProps: _transformProps.default
    });
  }

}

exports.default = DiscreteBarChartPlugin;