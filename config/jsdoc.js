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
        name: 'Status',
        description: 'API status test.',
      },
      {
        name: 'Submissions',
        description: 'Operations related to child mission status.',
      },
      {
        name: 'Parents',
        description: 'Operations for parent profiles.',
      },
      {
        name: 'Profiles',
        description:
          'Endpoint to load all profiles related to a user account at login.',
      },
      {
        name: 'Children',
        description: 'Operations for child profiles.',
      },
      {
        name: 'Stories',
        description: 'Operations for story data.',
      },
      {
        name: 'Avatars',
        description: 'Operations for avatar data.',
      },
      {
        name: 'Grade Levels',
        description: 'Operations for grade level data.',
      },
      {
        name: 'Moderation',
        description: 'Endpoints for content moderation.',
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
          description: 'Error: Access token is missing or invalid.',
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
          description: 'Error: Database issue.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'PostgreSQL error message.',
                  },
                },
              },
            },
          },
        },
        MissingParams: {
          description: 'Error: Missing parameters.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Missing parameters.',
                  },
                },
              },
            },
          },
        },
        InvalidID: {
          description: 'Error: Incorrect ID(s) passed in.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'InvalidID.',
                  },
                },
              },
            },
          },
        },
        UploadFailed: {
          description: 'Error while uploading to S3 bucket.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'File upload failed.',
                  },
                },
              },
            },
          },
        },
        EmptySuccess: {
          description: 'Returns an empty body on success.',
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
          description: 'Error: ID not found in table.',
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
          description: 'Error: Poorly formatted data.',
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
        DuplicateError: {
          description: 'Error: Can only submit once per story.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Only one submission allowed.',
                  },
                },
              },
            },
          },
        },
        MissingParameters: {
          description: 'Error: Missing parameters.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Missing parameters.',
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
