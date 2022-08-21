/* eslint-disable import/no-unresolved */
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['./src/tests/setup-environment-variables.js'],
    include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    watchIgnore: [
      '.*\\/node_modules\\/.*',
      '.*\\/build\\/.*',
      '.*\\/postgres-data\\/.*',
    ],
  },
});
