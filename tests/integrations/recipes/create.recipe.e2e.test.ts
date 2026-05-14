import request from 'supertest';
import { app } from '../../../src/app';
import { beforeAll, describe, expect, it } from 'vitest';
import { getToken, registerUser } from '../helpers/auth.helper';

let token: string;
let user: { id: number; name: string; login: string };

describe('Create Recipe', () => {
  beforeAll(async () => {
    await registerUser();
    const { token: userToken, user: userInfo } = await getToken();
    token = userToken;
    user = userInfo;
  });

  it('should fail to create a recipe without authentication', async () => {
    const newRecipe = {
      name: 'Test Recipe',
      ingredients: 'Test Ingredients',
      preparation_method: 'Test Preparation'
    };

    const response = await request(app)
      .post('/v1/recipes')
      .send(newRecipe)
      .expect(401);

    expect(response.body.error).toBe('No token provided');
  });

  it('should fail to create a recipe with invalid token', async () => {
    const newRecipe = {
      name: 'Test Recipe',
      ingredients: 'Test Ingredients',
      preparation_method: 'Test Preparation'
    };

    const response = await request(app)
      .post('/v1/recipes')
      .set('Authorization', 'Bearer invalid_token')
      .send(newRecipe)
      .expect(401);

    expect(response.body.error).toBe('Invalid token');
  });

  it('should fail to create a recipe with missing fields', async () => {
    const response = await request(app)
      .post('/v1/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Recipe' })
      .expect(400);

    expect(response.body).toEqual({
      errors: [
        {
          message: 'Invalid input: expected array, received undefined',
          path: 'preparation_method'
        },
        {
          message: 'Invalid input: expected array, received undefined',
          path: 'ingredients'
        }
      ],
      message: 'Dados de entrada inválidos'
    });
  });

  it('should fail to create a recipe with empty fields', async () => {
    const { token } = await getToken();

    const newRecipe = {
      name: '',
      ingredients: '',
      preparation_method: ''
    };

    const response = await request(app)
      .post('/v1/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send(newRecipe)
      .expect(400);

    expect(response.body).toEqual({
      errors: [
        {
          message: 'Invalid input: expected array, received string',
          path: 'preparation_method'
        },
        {
          message: 'Too small: expected string to have >=1 characters',
          path: 'preparation_method'
        },
        {
          message: 'Invalid input: expected array, received string',
          path: 'ingredients'
        },
        {
          message: 'Too small: expected string to have >=1 characters',
          path: 'ingredients'
        }
      ],
      message: 'Dados de entrada inválidos'
    });
  });

  it('should fail to create a recipe with non-array ingredients and preparation', async () => {
    const newRecipe = {
      name: 'Test Recipe',
      ingredients: 'Not an array',
      preparation_method: 'Not an array'
    };

    const response = await request(app)
      .post('/v1/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send(newRecipe)
      .expect(400);

    expect(response.body).toEqual({
      errors: [
        {
          message: 'Invalid input: expected array, received string',
          path: 'preparation_method'
        },
        {
          message: 'Invalid input: expected array, received string',
          path: 'ingredients'
        }
      ],
      message: 'Dados de entrada inválidos'
    });
  });

  it('should fail to create a recipe with empty array for ingredients and preparation', async () => {
    const newRecipe = {
      name: 'Test Recipe',
      ingredients: [],
      preparation_method: []
    };

    const response = await request(app)
      .post('/v1/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send(newRecipe)
      .expect(400);

    expect(response.body).toEqual({
      errors: [
        {
          message: 'Too small: expected array to have >=1 items',
          path: 'preparation_method'
        },
        {
          message: 'Too small: expected array to have >=1 items',
          path: 'ingredients'
        }
      ],
      message: 'Dados de entrada inválidos'
    });
  });

  it('should create a recipe successfully', async () => {
    const newRecipe = {
      name: 'Test Recipe',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      preparation_method: ['Step 1', 'Step 2']
    };

    const response = await request(app)
      .post('/v1/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send(newRecipe)
      .expect(201);

    expect(response.body).toEqual({
      recipe: {
        id: expect.any(Number),
        id_user: Number(user.id),
        name: newRecipe.name,
        ingredients: newRecipe.ingredients,
        preparation_method: newRecipe.preparation_method,
        created_at: expect.any(String),
        updated_at: expect.any(String)
      }
    });
  });
});
