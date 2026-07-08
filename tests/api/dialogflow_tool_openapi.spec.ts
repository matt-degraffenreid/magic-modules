import { test, expect } from '@playwright/test';

test.describe('Story 1.1: Implement Basic Tool Resource with OpenAPI Spec API Tests (ATDD)', () => {
  test.skip('[P0] should create Dialogflow Tool with valid OpenAPI spec', async ({ request }) => {
    // THIS TEST WILL FAIL - Resource not implemented yet
    const response = await request.post('/v2/projects/test-project/agent/tools', {
      data: {
        displayName: 'test-tool',
        description: 'Basic tool with OpenAPI spec',
        specification: {
          openApiSpec: {
            textSchema: 'openapi: 3.0.0...'
          }
        }
      }
    });

    expect(response.status()).toBe(200);
  });
});
