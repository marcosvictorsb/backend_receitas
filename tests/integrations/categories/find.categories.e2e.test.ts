import request from 'supertest';
import { app } from '../../../src/app';
import { beforeAll, describe, expect, it } from 'vitest';
import { getToken, registerUser } from '../helpers/auth.helper';

let token: string;
let user: { id: number; name: string; login: string };

describe('Find Categories', () => {
  beforeAll(async () => {
    await registerUser();
    const { token: userToken, user: userInfo } = await getToken();
    token = userToken;
    user = userInfo;
  });

  it('should find categories successfully', async () => {
    const response = await request(app)
      .get('/v1/categories')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body.categories)).toBe(true);
    expect(response.body.categories.length).toBeGreaterThan(0);
    expect(response.body.categories[0]).toHaveProperty('id');
    expect(response.body.categories[0]).toHaveProperty('name');
  });

  it('should fail to find categories without authentication', async () => {
    const response = await request(app).get('/v1/categories').expect(401);

    expect(response.body.error).toBe('No token provided');
  });

  it('should fail to find categories with invalid token', async () => {
    const response = await request(app)
      .get('/v1/categories')
      .set('Authorization', 'Bearer invalid_token')
      .expect(401);

    expect(response.body.error).toBe('Invalid token');
  });
});
