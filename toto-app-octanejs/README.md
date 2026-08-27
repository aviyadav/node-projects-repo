# OctaneJS Learning Project

This repository is a minimal learning project for understanding how OctaneJS works in practice. It combines Vite, TypeScript, and the Octane compiler to build a small todo application that demonstrates component structure, state management, effects, and event handling.

## Purpose

The project is intentionally small and explicit so it can serve as a reference for:

- OctaneJS component syntax
- `.tsrx` file structure
- local component state with `useState`
- side effects with `useEffect`
- event-driven UI updates
- integrating Octane with Vite

## Tech stack

- `octane` — UI framework
- `typescript` — static typing
- `vite` — local dev server and production bundling
- `@tsrx/typescript-plugin` — TypeScript integration for `.tsrx`
- `@tsrx/prettier-plugin` — formatting plugin for TSRX files

## Project layout

```text
.
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── src/
    ├── App.tsrx
    ├── Todo.tsrx
    ├── main.ts
    └── styles.css
```

## Key implementation details

### Entry point

`src/main.ts` mounts the application into the browser root:

```ts
import { createRoot } from "octane";
import { Todo } from "./Todo";

createRoot(document.getElementById("root")!).render(Todo);
```

This is the Octane equivalent of a framework bootstrap step. It creates a root and renders the component tree into the DOM.

### Component model

Octane components are functions that return render output using `.tsrx` syntax. The app uses a component pattern that looks like:

```ts
export function Todo() @{
  const [todos, setTodos] = useState<string[]>([...]);

  return <div>...</div>;
}
```

The `@{ ... }` block is Octane's way of defining a component body.

### State and effects

The todo component uses `useState` for data and `useEffect` for side effects:

```ts
const [todos, setTodos] = useState<string[]>([
  "Buy a car",
  "Write script",
  "Record demo",
  "Buy coffee",
]);

useEffect(() => {
  document.title = `You have ${todos.length} todos`;
});
```

This demonstrates the typical pattern of reactive UI state with a derived DOM/document side effect.

### Event handling

The filter input binds user input to component state:

```ts
<input
  value={query}
  onInput={(e) => setQuery(e.currentTarget.value)}
  placeholder="Filter..."
/>
```

This is a useful example of how events are handled in Octane and how state updates propagate to the rendered output.

## OctaneJS notes

OctaneJS follows the same general mental model as React-like frameworks, but with a TypeScript-first rendering pipeline and `.tsrx` components.

Important concepts to study in this project:

- Components are plain functions
- State is local and reactive
- Render output is declarative
- Events are wired directly to handlers
- Effects are used for imperative work outside the rendered output

This project is a practical starting point for comparing Octane's patterns with React, JSX, and other component-based frameworks.

## Development commands

Install dependencies:

```bash
npm install
```

Run the app in development mode:

```bash
npm run dev
```

This starts the Vite dev server, usually on:

```text
http://localhost:5173
```

Create a production build:

```bash
npm run build
```

Run the TypeScript type check:

```bash
npm run typecheck
```

## Build output

The production build will generate a `dist/` bundle using Vite. This is useful for verifying that the project compiles correctly before deployment or further extension.

## Learning goals

This repository is best treated as a sandbox for experimenting with:

1. component design
2. state mutations and derived UI
3. event handling in Octane
4. effect-driven updates
5. Vite + TypeScript integration for a modern frontend setup

## Useful follow-up ideas

- add todo creation and deletion
- implement filtering by query string
- store todos in `localStorage`
- refactor into smaller components
- compare the same behavior against a React implementation
