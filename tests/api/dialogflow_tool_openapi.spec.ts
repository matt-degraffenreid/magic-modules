import { test, expect } from '@playwright/test';

test.describe('Story 1.1: Implement Basic Tool Resource with OpenAPI Spec API Tests (ATDD)', () => {
  test('[P0] should create Dialogflow Tool with valid OpenAPI spec', async ({ request }) => {
    const response = await request.post('/v2beta1/projects/test-project/locations/us-central1/tools', {
      data: {
        displayName: 'test-tool',
        description: 'Basic tool with OpenAPI spec',
        openApiSpec: {
          textSchema: 'openapi: 3.0.0...'
        }
      }
    });

    expect(response.status()).toBe(200);
  });
});
