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

const { getScale } = CategoricalColorNamespace;

export type DiscreteBarDataPoint = {
  key: string;
  value: number;
};

export type DiscreteBarChartProps = {
  height: number;
  width: number;
  colorScheme: string;
  data: DiscreteBarDataPoint[];
  showBarValue: boolean;
  orderBars: boolean;
  showLegend: boolean;
  xTicksLayout: string;
  yAxisFormat: string;
};

export type AxisTickAnchor = 'start' | 'middle' | 'end' | 'inherit';

export default class DiscreteBarChart extends React.PureComponent<DiscreteBarChartProps> {
  getColor(value: any, colorScheme: string) {
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
      yAxisFormat,
    } = this.props;
    let { data } = this.props;

    // Layout for x ticks
    let tickAngle = 0;
    let tickMargin = 0;
    let tickAnchor: AxisTickAnchor = 'middle';
    if (xTicksLayout === 'auto' || xTicksLayout === '45°') {
      tickAngle = 45;
      tickMargin = 100;
      tickAnchor = 'start';
    }

    const margin = { top: 30, bottom: 30 + tickMargin, left: 75, right: 20 };
    const formatter = getNumberFormatter(yAxisFormat);

    if (orderBars) {
      data = _.orderBy(data, ['key', 'asc']);
    }

    // Then we'll create some bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // We'll make some helpers to get at the data we want
    const x = (d: DiscreteBarDataPoint) => d.key;
    const y = (d: DiscreteBarDataPoint) => d.value;

    // And then scale the graph by our data
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.1,
    });
    const yScale = scaleLinear<Number>({
      rangeRound: [yMax, 0],
      domain: [0, Math.max(...data.map(y))],
    });

    // Compose together the scale and accessor functions to get point functions
    const compose = (scale: any, accessor: any) => (data: any) => scale(accessor(data));
    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);

    return (
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          <Grid
            xScale={xScale}
            // @ts-ignore
            yScale={yScale}
            width={xMax}
            height={yMax}
            numTicksRows={5}
          />

          <AxisLeft
            scale={yScale}
            top={0}
            left={0}
            hideTicks={true}
            numTicks={5}
            // @ts-ignore
            tickFormat={formatter}
            tickLabelProps={(tickValue, index) => {
              return {
                fontFamily: 'Arial,sans-serif',
                fontSize: 12,
                textAnchor: 'end',
              };
            }}
          />

          <AxisBottom
            scale={xScale}
            top={yMax}
            stroke={'#1b1a1e'}
            hideAxisLine={true}
            hideTicks={true}
            tickLabelProps={(tickValue, index) => {
              return {
                fontFamily: 'Arial,sans-serif',
                fontSize: 12,
                textAnchor: tickAnchor,
                angle: tickAngle,
              };
            }}
          />

          <Group>
            {data.map((d, i) => {
              const barHeight = yMax - yPoint(d);

              return (
                <g key={d.key}>
                  <Bar
                    x={xPoint(d)}
                    y={yMax - barHeight}
                    height={barHeight}
                    width={xScale.bandwidth()}
                    // fill={color(xPoint(d))}
                    fill={this.getColor(x(d), colorScheme)}
                  />

                  {showBarValue && (
                    <Text
                      x={xPoint(d) + xScale.bandwidth() / 2}
                      y={yMax - barHeight - 10}
                      textAnchor="middle"
                      style={{
                        fontFamily: 'Arial,sans-serif',
                        fontSize: 12,
                        textAnchor: 'middle',
                      }}
                    >
                      {formatter(d.value)}
                    </Text>
                  )}
                </g>
              );
            })}
          </Group>
        </Group>
      </svg>
    );
  }
}
