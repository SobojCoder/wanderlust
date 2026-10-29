<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` / `npm run build` / `npm run start` / `npm run lint` are the only scripts; dev/build use Turbopack (Next 16 default).
- Typecheck: `npx tsc --noEmit` (no npm script; `next build` also typechecks but does **not** run ESLint).
- Lint one file: `npx eslint <path>`. `npm run lint` runs ESLint 9 flat config (`eslint.config.mjs`) over the whole repo — `next lint` was removed in Next 16 and fails.
- **Lint is red out of the box**: 2 pre-existing `react-hooks/set-state-in-effect` errors in generated code (`src/components/ui/carousel.tsx`, `src/hooks/use-mobile.ts`) plus ~7 unused-variable warnings in app code. Not your regression; `npm run build` passes regardless. There is no test suite, CI, or formatter config — don't invent test commands.
- Verify with `npm run lint && npx tsc --noEmit && npm run build`, treating the known lint errors as baseline.

## Layout and toolchain

- Single app (not a monorepo): App Router in `src/app/`, alias `@/*` → `src/*`. README is stock boilerplate and its paths omit `src/`.
- Route prop types (`LayoutProps<"/">`, `PageProps`) are generated into `.next/types` (referenced by `tsconfig.json`). On a fresh clone, `npx tsc --noEmit` fails until `npm run build` or one dev run has generated them.
- `next.config.ts`: `reactCompiler: true` (React Compiler via `babel-plugin-react-compiler`); `cacheComponents` and `partialPrefetching` are explicitly **off**. `images.remotePatterns` allows any https hostname. For async/`use cache` data patterns, consult `node_modules/next/dist/docs/` instead of assuming Next 14/15 behavior.
- Tailwind CSS v4 is CSS-first: no `tailwind.config`, all theme/setup lives in `src/app/globals.css`, and CSS is loaded through the Turbopack rule in `next.config.ts` — don't move styling config to JS.

## Data and auth

- **CRUD data comes from an external backend at `http://localhost:5000`**, hardcoded in 5 files (`src/app/destinations/page.tsx`, `src/app/destinations/[id]/page.tsx`, `src/app/Add-destination/page.tsx`, `src/components/EditDestinationDialog.tsx`, `src/components/DeleteDestinationDialog.tsx`). That API is **not in this repo** — destination pages fail or hang without it running. There are no Next.js route handlers for destinations; the only API route is auth.
- Auth is **better-auth** with a MongoDB adapter: server config in `src/lib/auth.ts` (email+password only, no OAuth), client in `src/lib/auth-client.ts`, catch-all handler at `src/app/api/auth/[...all]/route.ts`. Session state in components via `authClient.useSession()`.
- Required env vars (`.env` is gitignored): `MONGODB_URL` (note: not `MONGODB_URI`) and `BETTER_AUTH_URL`. `src/lib/auth.ts` casts `MONGODB_URL` with `as string`, so a missing var crashes at runtime, not compile time.

## UI components (shadcn)

- `src/components/ui/` contains shadcn components in style **base-nova** built on **Base UI (`@base-ui/react`)**, not Radix — follow the existing imports; don't add `@radix-ui/*` primitives.
- `import { cn } from "cn"` — components import the `cn` npm package directly; `src/lib/utils.ts` only re-exports it.
- Add or regenerate components with `npx shadcn add <component>` (config: `components.json`). The files are editable, but regeneration overwrites local changes.
