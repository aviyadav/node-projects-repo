import type { ChartDefinition } from "./types";

export const chartDefinitions: ChartDefinition[] = [
  {
    id: "bar-chart",
    heading: "Bar Chart",
    data: [
      {
        x: ["Italy", "France", "Spain", "Portugal", "Germany"],
        y: [55, 49, 44, 24, 15],
        type: "bar",
        orientation: "v",
        marker: { color: "rgb(142,124,195)" },
      },
    ],
    layout: {
      title: { text: "World Wide Wine Production" },
    },
  },
  {
    id: "line-chart",
    heading: "Line Chart",
    data: [
      {
        x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        y: [12, 15, 13, 17, 21, 19, 23],
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "rgb(31,119,180)" },
      },
    ],
    layout: {
      title: { text: "Weekly Trend" },
    },
  },
  {
    id: "pie-chart",
    heading: "Pie Chart",
    data: [
      {
        labels: ["Desktop", "Mobile", "Tablet"],
        values: [58, 34, 8],
        type: "pie",
      },
    ],
    layout: {
      title: { text: "Traffic by Device" },
    },
  },
];
