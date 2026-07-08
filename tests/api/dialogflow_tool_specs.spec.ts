import { test, expect } from '@playwright/test';

test.describe('Story 1.2: Support All Tool Specifications and Authentication API Tests (ATDD)', () => {
  test('[P0] should create Dialogflow Tool with Function Spec', async ({ request }) => {
    const response = await request.post('/v2beta1/projects/test-project/locations/us-central1/tools', {
      data: {
        displayName: 'function-tool',
        description: 'Tool with Function spec',
        functionSpec: {
          inputSchema: '{"type": "object"}',
          outputSchema: '{"type": "object"}'
        }
      }
    });
    expect(response.status()).toBe(200);
  });

  test('[P0] should create Dialogflow Tool with Connector Spec', async ({ request }) => {
    const response = await request.post('/v2beta1/projects/test-project/locations/us-central1/tools', {
      data: {
        displayName: 'connector-tool',
        description: 'Tool with Connector spec',
        connectorSpec: {
          name: 'projects/test-project/locations/us-central1/connections/test-connection',
          actions: []
        }
      }
    });
    expect(response.status()).toBe(200);
  });

  test('[P0] should create Dialogflow Tool with Data Store Spec', async ({ request }) => {
    const response = await request.post('/v2beta1/projects/test-project/locations/us-central1/tools', {
      data: {
        displayName: 'datastore-tool',
        description: 'Tool with Data Store spec',
        dataStoreSpec: {
          dataStoreConnections: [],
          fallbackPrompt: {}
        }
      }
    });
    expect(response.status()).toBe(200);
  });

  test('[P1] should create Dialogflow Tool with OpenAPI Spec and Authentication', async ({ request }) => {
    const response = await request.post('/v2beta1/projects/test-project/locations/us-central1/tools', {
      data: {
        displayName: 'auth-tool',
        description: 'Tool with OpenAPI spec and Auth',
        openApiSpec: {
          textSchema: 'openapi: 3.0.0...',
          authentication: {
            apiKeyConfig: {
              keyName: 'api-key',
              apiKey: 'secret-key',
              requestLocation: 'HEADER'
            }
          }
        }
      }
    });
    expect(response.status()).toBe(200);
  });

  test('[P1] should create Dialogflow Tool with OpenAPI Spec and OAuth', async ({ request }) => {
    const response = await request.post('/v2beta1/projects/test-project/locations/us-central1/tools', {
      data: {
        displayName: 'oauth-tool',
        description: 'Tool with OpenAPI spec and OAuth',
        openApiSpec: {
          textSchema: 'openapi: 3.0.0...',
          authentication: {
            oauthConfig: {
              oauthGrantType: 'CLIENT_CREDENTIALS',
              clientId: 'client-id',
              clientSecret: 'client-secret',
              tokenEndpoint: 'https://example.com/token'
            }
          }
        }
      }
    });
    expect(response.status()).toBe(200);
  });

  test('[P1] should create Dialogflow Tool with OpenAPI Spec and Service Agent Auth', async ({ request }) => {
    const response = await request.post('/v2beta1/projects/test-project/locations/us-central1/tools', {
      data: {
        displayName: 'service-agent-tool',
        description: 'Tool with OpenAPI spec and Service Agent Auth',
        openApiSpec: {
          textSchema: 'openapi: 3.0.0...',
          authentication: {
            serviceAgentAuthConfig: {
              serviceAgentAuth: 'ID_TOKEN'
            }
          }
        }
      }
    });
    expect(response.status()).toBe(200);
  });

  test('[P1] should create Dialogflow Tool with OpenAPI Spec and Bearer Token', async ({ request }) => {
    const response = await request.post('/v2beta1/projects/test-project/locations/us-central1/tools', {
      data: {
        displayName: 'bearer-tool',
        description: 'Tool with OpenAPI spec and Bearer Token',
        openApiSpec: {
          textSchema: 'openapi: 3.0.0...',
          authentication: {
            bearerTokenConfig: {
              token: 'bearer-token'
            }
          }
        }
      }
    });
    expect(response.status()).toBe(200);
  });

  test('[P0] should fail to create Dialogflow Tool with multiple specs', async ({ request }) => {
    const response = await request.post('/v2beta1/projects/test-project/locations/us-central1/tools', {
      data: {
        displayName: 'invalid-tool',
        openApiSpec: { textSchema: '...' },
        functionSpec: { inputSchema: '...' }
      }
    });
    expect(response.status()).toBe(400);
  });

  test('[P1] should fail to create Dialogflow Tool with missing required spec fields', async ({ request }) => {
    const response = await request.post('/v2beta1/projects/test-project/locations/us-central1/tools', {
      data: {
        displayName: 'invalid-connector-tool',
        connectorSpec: {
          actions: []
        }
      }
    });
    expect(response.status()).toBe(400);
  });
});
