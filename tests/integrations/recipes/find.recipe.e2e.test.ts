import request from 'supertest';
import { app } from '../../../src/app';
import { beforeAll, describe, expect, it } from 'vitest';
import { getToken, registerUser } from '../helpers/auth.helper';

let token: string;
let user: { id: number; name: string; login: string };

describe('Find Recipe', () => {
  beforeAll(async () => {
    await registerUser();
    const { token: userToken, user: userInfo } = await getToken();
    token = userToken;
    user = userInfo;
  });

  it('should fail to find a recipe without authentication', async () => {
    const response = await request(app).get('/v1/recipes/').expect(401);

    expect(response.body.error).toBe('No token provided');
  });

  it('should fail to find a recipe with invalid token', async () => {
    const response = await request(app)
      .get('/v1/recipes/')
      .set('Authorization', 'Bearer invalid_token')
      .expect(401);

    expect(response.body.error).toBe('Invalid token');
  });

  it('should return empty result for a recipe with non-existing id', async () => {
    const response = await request(app)
      .get('/v1/recipes/')
      .set('Authorization', `Bearer ${token}`)
      .query({ id: 999999 })
      .expect(200);

    expect(response.body).toEqual({
      recipes: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      }
    });
  });

  it('should return empty result for a recipe with non-existing name', async () => {
    const response = await request(app)
      .get('/v1/recipes/')
      .set('Authorization', `Bearer ${token}`)
      .query({ name: 'NonExistingRecipeName' })
      .expect(200);

    expect(response.body).toEqual({
      recipes: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      }
    });
  });

  it('should return empty result for a recipe with non-existing category id', async () => {
    const response = await request(app)
      .get('/v1/recipes/')
      .set('Authorization', `Bearer ${token}`)
      .query({ id_category: 999999 })
      .expect(200);

    expect(response.body).toEqual({
      recipes: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      }
    });
  });

  it('should find recipes with pagination', async () => {
    const response = await request(app)
      .get('/v1/recipes/')
      .set('Authorization', `Bearer ${token}`)
      .query({ page: 1, limit: 5 })
      .expect(200);

    expect(response.body).toHaveProperty('recipes');
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.pagination).toHaveProperty('total');
    expect(response.body.pagination).toHaveProperty('page');
    expect(response.body.pagination).toHaveProperty('limit');
    expect(response.body.pagination).toHaveProperty('totalPages');
  });

  it('should find recipes with search query', async () => {
    const response = await request(app)
      .get('/v1/recipes/')
      .set('Authorization', `Bearer ${token}`)
      .query({ search: 'Test' })
      .expect(200);

    expect(response.body).toHaveProperty('recipes');
    expect(Array.isArray(response.body.recipes)).toBe(true);
  });

  it('should find recipes with category filter', async () => {
    const response = await request(app)
      .get('/v1/recipes/')
      .set('Authorization', `Bearer ${token}`)
      .query({ id_category: 1 })
      .expect(200);

    expect(response.body).toHaveProperty('recipes');
    expect(Array.isArray(response.body.recipes)).toBe(true);
  });

  it('should find recipes with multiple filters', async () => {
    const response = await request(app)
      .get('/v1/recipes/')
      .set('Authorization', `Bearer ${token}`)
      .query({ search: 'Test', id_category: 1, page: 1, limit: 5 })
      .expect(200);

    expect(response.body).toHaveProperty('recipes');
    expect(Array.isArray(response.body.recipes)).toBe(true);
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.pagination).toHaveProperty('total');
    expect(response.body.pagination).toHaveProperty('page');
    expect(response.body.pagination).toHaveProperty('limit');
    expect(response.body.pagination).toHaveProperty('totalPages');
  });
});
