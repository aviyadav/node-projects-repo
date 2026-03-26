import Plotly from "plotly.js-dist-min";
import type { ChartDefinition } from "./types";

export async function renderCharts(
  root: HTMLElement,
  charts: ChartDefinition[],
): Promise<void> {
  for (const chart of charts) {
    const section = document.createElement("section");
    section.className = "chart-panel";

    const heading = document.createElement("h2");
    heading.className = "chart-title";
    heading.textContent = chart.heading;

    const chartContainer = document.createElement("div");
    chartContainer.id = chart.id;
    chartContainer.className = "chart-canvas";

    section.append(heading, chartContainer);
    root.appendChild(section);

    await Plotly.newPlot(chartContainer, chart.data, chart.layout, chart.config);
  }
}
