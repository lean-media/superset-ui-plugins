import React from 'react';
export declare type DiscreteBarDataPoint = {
    key: string;
    value: number;
};
export declare type DiscreteBarChartProps = {
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
export declare type AxisTickAnchor = 'start' | 'middle' | 'end' | 'inherit';
export default class DiscreteBarChart extends React.PureComponent<DiscreteBarChartProps> {
    getColor(value: any, colorScheme: string): any;
    render(): JSX.Element;
}
//# sourceMappingURL=DiscreteBarChart.d.ts.map