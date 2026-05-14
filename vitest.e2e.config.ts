import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/integrations/**/*.test.ts'],
    globals: true,
    testTimeout: 15000,
    coverage: {
      enabled: false,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/domains/**/*.ts'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/domains/**/factories/**',
        'src/domains/**/factory/**',
        'src/domains/**/validators/**',
        'src/domains/**/routes/**',
        'src/domains/**/entity/**',
        'src/domains/**/interfaces/**',
        'src/domains/**/models/**',
        'src/domains/**/model/**'
      ]
    },
    env: { NODE_ENV: 'testing' }
  }
});
