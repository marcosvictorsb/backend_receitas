import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/domains/**/*.ts'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.spec.ts',
        '**/*.test.ts',
        'src/configs/**',
        'src/infra/**',
        'src/domains/**/factories/**',
        'src/domains/**/routes/**',
        'src/domains/**/entity/**',
        'src/domains/**/interfaces/**',
        'src/domains/**/models/**'
      ]
    }
  }
});
