module.exports = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'StorySquad API',
      version: '1.0.0',
      description: 'A companion API for our StorySquad React website',
      license: {
        name: 'MIT',
        url: 'https://en.wikipedia.org/wiki/MIT_License',
      },
    },
    tags: [
      {
        name: 'status',
        description: 'Everything about your status',
      },
      {
        name: 'parent',
        description: 'Operations for parent profiles',
      },
      {
        name: 'child',
        description: 'Operations for child profiles',
      },
      {
        name: 'story',
        description: 'Operations for story data',
      },
    ],
    externalDocs: {
      description: 'Data Science scaffold service docs',
      url: 'https://ds.labsscaffolding.dev/',
    },
    components: {
      securitySchemes: {
        okta: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'Okta idToken JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Error: Access token is missing or invalid',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Missing idToken',
                  },
                  error: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Missing idToken',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        DatabaseError: {
          description: 'Database error. Try again.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Could not access database',
                  },
                },
              },
            },
          },
        },
        EmptySuccess: {
          description: '',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {},
              },
            },
          },
        },
        NotFound: {
          description: 'Not Found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'DataNotFound',
                  },
                },
              },
            },
          },
        },
        InvalidFormat: {
          description: 'Error: Poorly Formatted Data',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'InvalidData',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./api/**/*Router.js'],
};
