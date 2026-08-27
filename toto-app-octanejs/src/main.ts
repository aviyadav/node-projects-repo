import { createRoot } from "octane";
import { App } from "./App.tsrx";
import { Todo } from "./Todo";

createRoot(document.getElementById("root")!).render(Todo);
