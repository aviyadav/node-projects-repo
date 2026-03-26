export type ChartDefinition = {
  id: string;
  heading: string;
  data: Partial<Plotly.PlotData>[];
  layout: Partial<Plotly.Layout>;
  config?: Partial<Plotly.Config>;
};
