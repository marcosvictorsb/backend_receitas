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
        }
      }
    }
  },
  apis: ['src/domains/**/routes/*.ts']
});
