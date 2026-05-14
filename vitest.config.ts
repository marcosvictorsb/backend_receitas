import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/domains/**/*.spec.ts', 'tests/mocks/**/*.spec.ts'],
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
        'src/domains/**/factory/**',
        'src/domains/**/validators/**',
        'src/domains/**/routes/**',
        'src/domains/**/entity/**',
        'src/domains/**/interfaces/**',
        'src/domains/**/models/**',
        'src/domains/**/model/**'
      ]
    }
  }
});
