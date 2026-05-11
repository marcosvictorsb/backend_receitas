import { Response } from 'express';
import { vi } from 'vitest';

export function makeResponseMock(): Response {
  const res: Response = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}
