import request from 'supertest';
import { app } from '../../../src/app';
import { beforeAll, describe, expect, it } from 'vitest';
import { getToken, registerUser } from '../helpers/auth.helper';

let token: string;
let user: { id: number; name: string; login: string };

describe('Delete Recipe', () => {
  beforeAll(async () => {
    await registerUser();
    const { token: userToken, user: userInfo } = await getToken();
    token = userToken;
    user = userInfo;
  });

  it('should fail to delete a recipe without authentication', async () => {
    const response = await request(app).delete('/v1/recipes/1').expect(401);

    expect(response.body.error).toBe('No token provided');
  });

  it('should fail to delete a recipe with invalid token', async () => {
    const response = await request(app)
      .delete('/v1/recipes/1')
      .set('Authorization', 'Bearer invalid_token')
      .expect(401);

    expect(response.body.error).toBe('Invalid token');
  });

  it('should fail to delete a recipe that does not exist', async () => {
    const response = await request(app)
      .delete('/v1/recipes/999999')
      .set('Authorization', `Bearer ${token}`)
      .expect(404);

    expect(response.body).toEqual({
      message: 'Receita não encontrada'
    });
  });

  it('should delete a recipe successfully', async () => {
    const newRecipe = {
      name: 'Recipe to Delete',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      preparation_method: ['Step 1', 'Step 2']
    };

    const createResponse = await request(app)
      .post('/v1/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send(newRecipe)
      .expect(201);

    const createdRecipeId = createResponse.body.recipe.id;

    const deleteResponse = await request(app)
      .delete(`/v1/recipes/${createdRecipeId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(deleteResponse.body).toEqual({
      message: 'Receita deletada com sucesso'
    });
  });
});
