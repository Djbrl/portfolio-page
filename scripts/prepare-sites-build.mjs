import { access, writeFile } from 'node:fs/promises';

if (process.env.VERCEL) process.exit(0);

await access(new URL('../dist/server/index.js', import.meta.url));

const wranglerConfig = {
  name: 'djibril-sy-portfolio',
  compatibility_date: '2026-05-15',
  compatibility_flags: ['nodejs_compat'],
  main: 'index.js',
  no_bundle: true,
  rules: [{ type: 'ESModule', globs: ['**/*.js', '**/*.mjs'] }],
  assets: { directory: '../client' },
};

await writeFile(
  new URL('../dist/server/wrangler.json', import.meta.url),
  `${JSON.stringify(wranglerConfig, null, 2)}\n`,
);
