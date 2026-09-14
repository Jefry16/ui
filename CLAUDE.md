# @vointika/ui

This package is the admin app's presentational layer. It renders. It knows
no route and names no endpoint, has no HTTP client of its own and is handed
one, and it is consumed as TypeScript source from git by one app. Everything
below follows from that sentence.

## Rules, each with the gate that enforces it

A rule is a test with an empty allow-list, or it is a habit. Where a line
says "no gate", the rule holds by review only, and that is written here so
the list never pretends.

1. **No vendored shadcn file is ever edited by hand.** `src/components/ui`
   and `components.json` are pinned by hash. To add or upgrade a primitive:
   `pnpm dlx shadcn@latest add <name>`, then `pnpm pin-ui`, in a PR that says
   so. To change how a primitive looks: a token in `src/styles.css`, or a
   wrapper in `src/components/app`.
   Gate: `src/gates/ui-vendor.test.ts`.
   Hole: `pin-ui` after a hand edit launders the edit. Review catches that.

2. **The dependency set is closed.** A new dependency is a deliberate line
   in the gate, in the same PR, with the reason in the PR body. A router or
   an HTTP client never belongs here; React Query is a peer because the data
   layer is built on it, and the client it calls arrives through
   `UiDataProvider` (`get`, `errorMessage`).
   Gate: `src/gates/boundary.test.ts`.

3. **Imports are relative.** The `#/` alias exists for the shadcn CLI and
   `pin-ui` rewrites it; a hand-written one typechecks here and breaks every
   consumer.
   Gate: `src/gates/boundary.test.ts`.

4. **Tokens only.** No raw palette class, no arbitrary value, no inline
   `style`. Colour and spacing come from `src/styles.css`.
   Gate: `src/gates/token-drift.test.ts`.

5. **Every App component ships a story, and every story mounts.** The built
   Storybook indexes every story file on disk.
   Gates: `src/gates/story-coverage.test.ts`, `src/gates/story-render.test.tsx`,
   `pnpm check-storybook-index`.

6. **Every sentence a component shows comes through `UiLabelsProvider`.**
   The package carries no message catalog and no locale.
   Gate: `src/providers/labels.test.tsx` proves a component refuses to render
   without the provider. No gate yet proves a sentence is not hardcoded.

7. **Nothing unused.** No file, export or dependency without a reader.
   Gate: `pnpm knip`.

8. **Accessible by default.** Form fields, dialogs and tables pass axe.
   Gate: `src/gates/a11y.test.tsx`. The Storybook a11y addon reports and does
   not fail; the test is the gate.

9. **No comments**, except a `biome-ignore` and a trap a name cannot carry.
   No gate.

10. **Vendored primitives are not tested here.** Their tests are upstream's;
    one written here pins a file this repo does not own and breaks on the
    next `shadcn add`. No test is named for a primitive, nothing but
    components lives in `src/components/ui`, and a test imports a primitive
    only as scaffolding for a subject of ours. Primitives are shown in
    Storybook from `src/stories/primitives`, the one place story-render
    never mounts, so they are seen and not tested.
    Gate: `src/gates/ui-vendor.test.ts`.

## Layout

Dependencies point down and never up. Nothing points out to an app concern.

| folder | holds | may import |
| --- | --- | --- |
| `src/styles.css`, `src/lib`, `src/hooks` | tokens, `cn`, `use-mobile` | nothing above |
| `src/providers` | the theme, label and data-client providers | the row above |
| `src/data` | the list convention: query state, the page drain, the table query | the rows above |
| `src/components/ui` | the vendored primitives (CLI path, never renamed) | the rows above |
| `src/components/app` | the App layer | the rows above |
| `src/stories/primitives` | the primitives shown in Storybook, never mounted by a test | the primitives |
| `src/gates` | the tests that enforce this file | anything |
| `src/test` | test helpers | anything |

The public surface is `src/index.ts` and `src/styles.css`, and only those:
`package.json`'s `exports` map refuses a deeper import.

11. **The look arrives.** The built Storybook, opened in a real browser,
    is styled: the font loads, the tokens resolve, a button is painted, an
    input has a border, the dark palette differs from the light one. The
    gate says "styled", never "styled exactly like this", so a token change
    never breaks it and a missing plugin always does.
    Gate: `pnpm smoke-storybook`, after `pnpm build-storybook`.

## Gates

```
pnpm typecheck && pnpm check && pnpm knip && pnpm test
pnpm build-storybook && pnpm check-storybook-index && pnpm smoke-storybook
```

The smoke needs Chromium: `pnpm exec playwright install chromium` once per
machine.

## Working rules

- Ship on a branch through a pull request into `main`. Never merge unless
  asked. Tag a release and repoint the app's dependency to the tag.
- A test earns its place when a mutation kills it. Name the mutation in
  the PR.
- Never write history into the repo. Present tense. Cite commits, not prose.
