import React from 'react';
import { SuperChart } from '@superset-ui/chart';
import data from './data';

export default [
  {
    renderStory: () => (
      <SuperChart
        chartType="discrete-bar"
        width={400}
        height={400}
        queryData={{ data }}
        formData={{
          bottomMargin: 30,
          colorScheme: 'd3Category10',
          dateTimeFormat: '%Y-%m-%d',
          leftMargin: 75,
          numberFormat: '.3s',
          richTooltip: true,
        }}
      />
    ),
    storyName: 'Discrete',
    storyPath: 'plugin-chart-discrete-bar|DiscreteBarChartPlugin',
  },
];
