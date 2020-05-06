import { t } from '@superset-ui/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/chart';
import transformProps from './transformProps';

function nonEmpty(v) {
  if (v === null || v === undefined || v === '' || Array.isArray(v) && v.length === 0) {
    return t('cannot be empty');
  }

  return false;
}

const metadata = new ChartMetadata({
  description: '',
  name: t('Discrete bar chart'),
  thumbnail: ''
});
const controlPanel = {
  controlPanelSections: [{
    label: t('Query'),
    expanded: true,
    controlSetRows: [['metric'], ['adhoc_filters'], ['groupby'], ['row_limit']]
  }, {
    label: t('Chart Options'),
    expanded: true,
    controlSetRows: [['color_scheme', 'label_colors'], ['show_bar_value'], ['order_bars'], ['y_axis_format']]
  }, {
    label: t('X Axis'),
    expanded: true,
    controlSetRows: [['x_ticks_layout']]
  }],
  controlOverrides: {
    groupby: {
      label: t('Series'),
      validators: [nonEmpty]
    }
  }
};
export default class DiscreteBarChartPlugin extends ChartPlugin {
  constructor() {
    super({
      controlPanel,
      loadChart: () => import('./DiscreteBarChart'),
      metadata,
      transformProps
    });
  }

}