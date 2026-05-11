import { vi } from 'vitest';

export class LoggerMock {
  info = vi.fn() as ReturnType<typeof vi.fn>;
  error = vi.fn() as ReturnType<typeof vi.fn>;
  warn = vi.fn() as ReturnType<typeof vi.fn>;
  debug = vi.fn() as ReturnType<typeof vi.fn>;
}
