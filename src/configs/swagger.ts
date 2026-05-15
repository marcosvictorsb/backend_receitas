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
            login: {
              type: 'string',
              format: 'email',
              example: 'any_email@com.br'
            },
            password: { type: 'string', example: 'AnyPass0rd' }
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
                login: {
                  type: 'string',
                  format: 'email',
                  example: 'any_email@com.br'
                }
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
            },
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
              type: 'array',
              items: { type: 'string' },
              example: [
                'Misture os ingredientes',
                'Asse a 180°C por 40 minutos'
              ]
            },
            ingredients: {
              type: 'array',
              items: { type: 'string' },
              example: ['Chocolate', 'Ovos', 'Açúcar', 'Farinha']
            },
            id_category: { type: 'number', example: 1 },
            categoria: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                name: { type: 'string', example: 'Doces' }
              }
            },
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
          required: ['preparation_method', 'ingredients'],
          properties: {
            name: { type: 'string', example: 'Bolo de Chocolate' },
            preparation_time_minutes: { type: 'number', example: 30 },
            servings: { type: 'number', example: 8 },
            preparation_method: {
              type: 'array',
              items: { type: 'string' },
              example: [
                'Misture os ingredientes',
                'Asse a 180°C por 40 minutos'
              ]
            },
            ingredients: {
              type: 'array',
              items: { type: 'string' },
              example: ['3 ovos', '2 xícaras de açúcar', '2 xícaras de farinha']
            },
            id_category: { type: 'number', example: 1 }
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
              items: { $ref: '#/components/schemas/RecipeObject' }
            },
            pagination: {
              type: 'object',
              properties: {
                total: { type: 'number', example: 50 },
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 10 },
                totalPages: { type: 'number', example: 5 }
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
