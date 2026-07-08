---
stepsCompleted: ['step-01-preflight-and-context', 'step-02-generation-mode', 'step-03-test-strategy', 'step-04c-aggregate', 'step-05-validate-and-complete']
lastStep: 'step-05-validate-and-complete'
lastSaved: '2026-07-08T17:57:00Z'
storyId: '1.2'
storyKey: '1-2-support-all-tool-specifications-and-authentication'
storyFile: '/usr/local/google/home/degraffenreid/development/github/magic-modules/_bmad-output/implementation-artifacts/1-2-support-all-tool-specifications-and-authentication.md'
atddChecklistPath: '/usr/local/google/home/degraffenreid/development/github/magic-modules/_bmad-output/test-artifacts/atdd-checklist-1-2-support-all-tool-specifications-and-authentication.md'
generatedTestFiles: ['tests/api/dialogflow_tool_specs.spec.ts']
inputDocuments:
  - 'project-context.md'
  - 'data-factories.md'
  - 'component-tdd.md'
  - 'test-quality.md'
  - 'test-levels-framework.md'
  - 'test-priorities-matrix.md'
---

# Preflight & Context Loading Summary

- **Story**: Support All Tool Specifications and Authentication (1.2)
- **Stack**: Backend (Go/Ruby)
- **Status**: Prerequisites met.
- **Loaded Knowledge**: Core Quality, Backend Patterns, Data Factories.

# Generation Mode Selection

- **Chosen Mode**: AI Generation
- **Reason**: Backend stack (Go/Ruby), no browser recording required. Tests will be generated based on YAML specifications and API patterns.

# Test Strategy

## 1. Map Acceptance Criteria

| AC | Scenario | Description |
| --- | --- | --- |
| 2, 3 | **Scenario 1: Mutually Exclusive Specs** | Verify `openApiSpec`, `functionSpec`, `connectorSpec`, `dataStoreSpec` are implemented as mutually exclusive top-level blocks in generated schema. |
| 4 | **Scenario 2: Authentication Configurations** | Verify `openApiSpec.authentication` supports API Key, OAuth, Service Agent, and Bearer. |
| 5 | **Scenario 3: Credential Security** | Verify `apiKey`, `clientSecret`, and `token` are marked `sensitive: true`. |

## 2. Select Test Levels

- **Verification/Schema**: Used to verify the YAML structure and generated code descriptors match the requirements (exclusivity, sensitivity).
- **Samples (Acceptance)**: Used to verify that Terraform configuration can be parsed and accepted by the provider (even if it fails at API level during Red Phase).

## 3. Prioritize Tests

- **P0**: Credential Security (AC 5) - Security critical.
- **P0**: Mutually Exclusive Specs (AC 3) - Schema integrity.
- **P1**: Specification Blocks (AC 2) - Core feature.
- **P1**: Authentication configurations (AC 4) - Core feature.

## 4. Red Phase Requirements

- Tests will use examples that fail to compile or generate if fields are missing.
- Verification scripts (if used) will fail if `sensitive` flag is missing or exclusivity is not enforced.

# ATDD Checklist: Support All Tool Specifications and Authentication

## TDD Red Phase (Current)

✅ Red-phase test scaffolds generated

- API Tests: 5 tests (all skipped)
- E2E Tests: 0 tests (skipped - backend stack)

## Acceptance Criteria Coverage

| AC | Scenario | Test |
| --- | --- | --- |
| 2, 3 | Support function_spec, connector_spec, and data_store_spec | `tests/api/dialogflow_tool_specs.spec.ts` |
| 4 | API Key, OAuth, Service Agent, and Bearer authentication | `tests/api/dialogflow_tool_specs.spec.ts` |
| 3 | Mutually exclusive specifications | `tests/api/dialogflow_tool_specs.spec.ts` |
| 5 | Sensitive flags | Implicitly tested via schema/generation verification (Playwright tests test API, not schema directly, but we assume API reflects schema). |

> [!NOTE]
> Sensitive flags (AC 5) are verified during generation/compilation, not directly via Playwright API tests which verify API behavior.

## Next Steps (Task-by-Task Activation)

During implementation of each task:

1. Remove `test.skip()` from the current test file or scenario
2. Run tests: `make test` (or appropriate command)
3. Verify the activated test fails first, then passes after implementation (green phase)
4. If any activated tests still fail unexpectedly:
   - Either fix implementation (feature bug)
   - Or fix test (test bug)
5. Commit passing tests

## Implementation Guidance

Feature endpoints to implement:
- `POST /v2beta1/projects/{project}/locations/{location}/tools` with `functionSpec`, `connectorSpec`, `dataStoreSpec` support.
- `authentication` block support in `openApiSpec`.

UI components to implement:
- N/A (Backend Stack)

# Completion Summary

- **Test Files Created**: `tests/api/dialogflow_tool_specs.spec.ts` (Red-phase scaffolds)
- **Checklist Output**: `/usr/local/google/home/degraffenreid/development/github/magic-modules/_bmad-output/test-artifacts/atdd-checklist-1-2-support-all-tool-specifications-and-authentication.md`
- **Story Handoff**: `1-2-support-all-tool-specifications-and-authentication`
- **Key Assumptions**: API reflects the planned schema changes (exclusivity, sensitivity).
- **Next Steps**: Proceed with `dev-story` to implement the YAML changes and verify against these scaffolds.




