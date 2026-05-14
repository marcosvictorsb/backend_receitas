import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/integrations/**/*.test.ts'],
    globals: true,
    testTimeout: 15000,
    coverage: { enabled: false },
    env: { NODE_ENV: 'testing' }
  }
});
