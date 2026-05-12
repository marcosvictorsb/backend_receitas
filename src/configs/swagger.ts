import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Receitas',
      version: '1.0.0',
      description: 'Documentação da API'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Ambiente local'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT para autenticação'
        }
      },
      schemas: {
        SignUpBody: {
          type: 'object',
          required: ['name', 'login', 'password'],
          properties: {
            name: { type: 'string', example: 'Marcos' },
            login: { type: 'string', example: 'marcos123' },
            password: { type: 'string', example: 'Senha@123' }
          }
        },
        SignUpSuccess: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                name: { type: 'string', example: 'Marcos' },
                login: { type: 'string', example: 'marcos123' }
              }
            }
          }
        },
        SignInBody: {
          type: 'object',
          required: ['login', 'password'],
          properties: {
            login: { type: 'string', example: 'usuario123' },
            password: { type: 'string', example: 'Senha123' }
          }
        },
        SignInSuccess: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.exemplo.token'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Login já existe' }
          }
        },
        RecipeObject: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'Bolo de Chocolate' },
            preparation_time_minutes: { type: 'number', example: 30 },
            servings: { type: 'number', example: 8 },
            preparation_method: {
              type: 'string',
              example: 'Misture os ingredientes e asse a 180°C'
            },
            ingredients: {
              type: 'string',
              example: 'Chocolate, ovos, açúcar, farinha'
            },
            id_category: { type: 'number', example: 1 },
            id_user: { type: 'number', example: 1 },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2026-05-11T10:30:00Z'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              example: '2026-05-11T10:30:00Z'
            }
          }
        },
        CreateRecipeBody: {
          type: 'object',
          required: ['preparation_method', 'ingredients', 'id_user'],
          properties: {
            name: { type: 'string', example: 'Bolo de Chocolate' },
            preparation_time_minutes: { type: 'number', example: 30 },
            servings: { type: 'number', example: 8 },
            preparation_method: {
              type: 'string',
              example: 'Misture os ingredientes e asse a 180°C'
            },
            ingredients: {
              type: 'string',
              example: 'Chocolate, ovos, açúcar, farinha'
            },
            id_category: { type: 'number', example: 1 },
            id_user: { type: 'number', example: 1 }
          }
        },
        CreateRecipeSuccess: {
          type: 'object',
          properties: {
            recipe: {
              $ref: '#/components/schemas/RecipeObject'
            }
          }
        },
        FindRecipeSuccess: {
          type: 'object',
          properties: {
            recipes: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/RecipeObject'
              }
            }
          }
        },
        DeleteRecipeSuccess: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Receita deletada com sucesso' }
          }
        }
      }
    }
  },
  apis: ['src/domains/**/routes/*.ts']
});
