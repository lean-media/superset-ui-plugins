import DiscreteBarChartPlugin from '../../../../superset-ui-plugin-chart-discrete-bar/src';
import Stories from './Stories';

new DiscreteBarChartPlugin().configure({ key: 'discrete-bar' }).register();

export default {
  examples: [...Stories],
};
