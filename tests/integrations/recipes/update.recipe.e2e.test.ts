import request from 'supertest';
import { app } from '../../../src/app';
import { beforeAll, describe, expect, it } from 'vitest';
import { getToken, registerUser } from '../helpers/auth.helper';

let token: string;
let user: { id: number; name: string; login: string };

describe('Update Recipe', () => {
  beforeAll(async () => {
    await registerUser();
    const { token: userToken, user: userInfo } = await getToken();
    token = userToken;
    user = userInfo;
  });

  it('should fail to update a recipe without authentication', async () => {
    const response = await request(app).put('/v1/recipes/1').expect(401);

    expect(response.body.error).toBe('No token provided');
  });

  it('should fail to update a recipe with invalid token', async () => {
    const response = await request(app)
      .put('/v1/recipes/1')
      .set('Authorization', 'Bearer invalid_token')
      .expect(401);

    expect(response.body.error).toBe('Invalid token');
  });

  it('should fail to update a recipe with non-existing id', async () => {
    const response = await request(app)
      .put('/v1/recipes/999999')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Recipe',
        ingredients: ['Updated Ingredient 1', 'Updated Ingredient 2'],
        preparation_method: ['Updated Step 1', 'Updated Step 2']
      })
      .expect(404);

    expect(response.body).toEqual({ message: 'Receita não encontrada' });
  });

  it('should update a recipe successfully', async () => {
    const createResponse = await request(app)
      .post('/v1/recipes/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Recipe to Update',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        preparation_method: ['Step 1', 'Step 2']
      })
      .expect(201);

    const recipeId = createResponse.body.recipe.id;

    const updateResponse = await request(app)
      .put(`/v1/recipes/${recipeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Recipe',
        ingredients: ['Updated Ingredient 1', 'Updated Ingredient 2'],
        preparation_method: ['Updated Step 1', 'Updated Step 2'],
        servings: 4,
        preparation_time_minutes: 30,
        id_category: 1
      })
      .expect(200);

    expect(updateResponse.body).toEqual({
      recipe: {
        id: recipeId,
        id_user: user.id,
        id_category: 1,
        name_category: 'Bolos e tortas doces',
        name: 'Updated Recipe',
        ingredients: ['Updated Ingredient 1', 'Updated Ingredient 2'],
        preparation_method: ['Updated Step 1', 'Updated Step 2'],
        servings: 4,
        preparation_time_minutes: 30,
        created_at: expect.any(String),
        updated_at: expect.any(String)
      }
    });
  });

  it('should fail to update a recipe that belongs to another user', async () => {
    const nameOtherUser = 'Other User';
    const loginOtherUser = `otheruser_${Date.now()}`;
    const passwordOtherUser = 'password123';

    await request(app).post('/v1/auth/signup').send({
      name: nameOtherUser,
      login: loginOtherUser,
      password: passwordOtherUser
    });

    const response = await request(app).post('/v1/auth/signin').send({
      login: loginOtherUser,
      password: passwordOtherUser
    });

    const otherUserToken = response.body.token;

    const createResponse = await request(app)
      .post('/v1/recipes/')
      .set('Authorization', `Bearer ${otherUserToken}`)
      .send({
        name: 'Other User Recipe',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        preparation_method: ['Step 1', 'Step 2']
      })
      .expect(201);

    const recipeId = createResponse.body.recipe.id;

    const updateResponse = await request(app)
      .put(`/v1/recipes/${recipeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Recipe',
        ingredients: ['Updated Ingredient 1', 'Updated Ingredient 2'],
        preparation_method: ['Updated Step 1', 'Updated Step 2']
      })
      .expect(404);

    expect(updateResponse.body).toEqual({
      message: 'Receita não encontrada'
    });
  });

  it('should fail to update a recipe with invalid id', async () => {
    const response = await request(app)
      .put('/v1/recipes/invalid_id')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Recipe',
        ingredients: ['Updated Ingredient 1', 'Updated Ingredient 2'],
        preparation_method: ['Updated Step 1', 'Updated Step 2']
      })
      .expect(400);

    expect(response.body).toEqual({
      message: 'Dados de entrada inválidos',
      errors: [
        { path: 'id', message: 'id deve ser um numero inteiro positivo' }
      ]
    });
  });

  it('should fail to update a recipe without id', async () => {
    const response = await request(app)
      .put('/v1/recipes/')
      .set('Authorization', `Bearer ${token}`)
      .expect(404);

    expect(response.body).toEqual({
      message: 'Endpoint não encontrado'
    });
  });
});
