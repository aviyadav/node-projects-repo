import { chartDefinitions } from "./charts/definitions";
import { renderCharts } from "./charts/render";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("Missing #app root element in index.html");
}

renderCharts(root, chartDefinitions);
