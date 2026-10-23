# SibariFly landing form

React + TypeScript application built with Vite and the SWC React plugin.

## Development

Use the pnpm version pinned in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Code quality

Biome handles linting, formatting, and import organization. Its configuration
is in `biome.json`, with lint rules migrated from the previous configuration,
including React Hooks and Fast Refresh checks. Formatting uses two spaces,
single quotes in JavaScript/TypeScript, semicolons, and optional arrow parentheses.
Biome respects `.gitignore` and excludes build output.

```sh
pnpm lint          # Check lint rules; warnings fail the check
pnpm lint:fix      # Apply safe lint fixes
pnpm format        # Format supported files
pnpm format:check  # Check formatting without modifying files
pnpm check         # Check lint, formatting, and import organization
pnpm build         # Type-check and build for production
```

Use the [Biome editor extension](https://biomejs.dev/editors/first-party-extensions/)
for editor diagnostics and formatting. Markdown and other unsupported formats are
maintained manually.

## Continuous integration

GitHub Actions runs `pnpm lint` and `pnpm build` on pushes and pull requests.
The workflow uses Node.js 24, the pnpm version pinned in `package.json`, and a
frozen lockfile. It can also be started manually from the Actions tab.
