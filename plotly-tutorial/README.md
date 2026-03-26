# Plotly Tutorial (TypeScript + Vite)

A simple Plotly playground built with TypeScript and Vite. The app renders multiple charts (bar, line, pie) from reusable chart definitions.

## Tech Stack

- Node.js (recommended: v20+)
- pnpm (project uses `pnpm-lock.yaml` and `packageManager: pnpm@10.33.0`)
- Vite
- TypeScript
- Plotly (`plotly.js-dist-min`)

## Project Structure

```text
.
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── src/
    ├── main.ts
    └── charts/
        ├── definitions.ts
        ├── render.ts
        └── types.ts
```

## 1) Initial Setup

If you are setting this project up on a new machine:

```bash
# Check Node.js
node -v

# Enable Corepack (recommended for pnpm-managed projects)
corepack enable

# Activate pnpm
corepack prepare pnpm@latest --activate
```

If Corepack is not available, you can run pnpm commands via npx:

```bash
npx pnpm@latest --version
```

## 2) Install Dependencies

From the project root:

```bash
pnpm install
```

This installs all dependencies from `package.json`.

### Dependency list used by this project

Runtime dependency:

- `plotly.js-dist-min` - browser-ready Plotly bundle used to render charts.

Dev dependencies:

- `typescript` - static typing and TS compiler tooling.
- `vite` - development server and build tool.
- `@types/plotly.js` - TypeScript type definitions for Plotly APIs.
- `@types/plotly.js-dist-min` - additional typings for the dist package import.

### If you want to add dependencies manually (fresh setup path)

```bash
# Runtime dependency
pnpm add plotly.js-dist-min

# Development dependencies
pnpm add -D typescript vite @types/plotly.js @types/plotly.js-dist-min
```

## 3) Run in Development

Start the Vite dev server:

```bash
pnpm dev
```

Then open the local URL printed in the terminal (typically `http://localhost:5173`).

## 4) Build for Production

Create an optimized production build:

```bash
pnpm build
```

This generates production assets in the `dist/` directory.

## 5) Preview the Production Build

Run the local preview server for the built app:

```bash
pnpm preview
```

Use the URL shown in terminal to verify the production output.

## Equivalent npm commands (optional)

If you prefer npm, these are script equivalents:

```bash
npm run dev
npm run build
npm run preview
```

## Available Scripts

Defined in `package.json`:

- `pnpm dev` - starts Vite dev server.
- `pnpm build` - builds for production.
- `pnpm preview` - previews production build locally.

## Notes

- Main app entry: `src/main.ts`
- Chart definitions: `src/charts/definitions.ts`
- Chart rendering logic: `src/charts/render.ts`
- HTML host page: `index.html`

## Troubleshooting

### `pnpm` command not found

Use one of the following:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

or:

```bash
npx pnpm@latest install
```

### Port already in use (Vite)

Run Vite on a different port:

```bash
pnpm dev -- --port 4173
```

### Fresh reinstall when dependencies look broken

```bash
rm -rf node_modules
pnpm install
```

### Lockfile mismatch after switching package managers

If `package-lock.json` exists from an older npm workflow:

```bash
rm -f package-lock.json
pnpm install
```

## Deployment

This project is a static frontend app built by Vite. Deploy the generated `dist/` folder.

### Generic static host flow

```bash
pnpm install
pnpm build
```

Upload the `dist/` directory to your hosting provider.

### Vercel

- Framework preset: `Vite`
- Build command: `pnpm build`
- Output directory: `dist`

### Netlify

- Build command: `pnpm build`
- Publish directory: `dist`

### GitHub Pages (via Actions)

Use a workflow that installs dependencies with pnpm, runs `pnpm build`, and publishes the `dist/` artifact to Pages.

## Screenshots / GIF

Add visuals to make the README easier to scan.

Suggested structure:

```text
assets/
    screenshots/
        charts-overview.png
    gifs/
        demo.gif
```

Example Markdown:

```md
## Preview

![Charts Overview](assets/screenshots/charts-overview.png)

![Demo](assets/gifs/demo.gif)
```
