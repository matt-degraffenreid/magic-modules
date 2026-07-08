---
stepsCompleted: ['step-01-preflight-and-context', 'step-02-generation-mode', 'step-03-test-strategy', 'step-04c-aggregate']
lastStep: 'step-04c-aggregate'
lastSaved: '2026-07-08T17:32:51Z'
storyId: '1.1'
storyKey: '1-1-implement-basic-tool-resource-with-openapi-spec'
storyFile: '/usr/local/google/home/degraffenreid/development/github/magic-modules/_bmad-output/implementation-artifacts/1-1-implement-basic-tool-resource-with-openapi-spec.md'
atddChecklistPath: '_bmad-output/test-artifacts/atdd-checklist-1-1-implement-basic-tool-resource-with-openapi-spec.md'
generatedTestFiles: ['tests/api/dialogflow_tool_openapi.spec.ts']
inputDocuments: [
  'file:///_bmad-output/implementation-artifacts/1-1-implement-basic-tool-resource-with-openapi-spec.md',
  'file:///_bmad-output/project-context.md',
  'file:///_bmad/tea/config.yaml'
]
---

# ATDD Checklist: 1.1 Implement Basic Tool Resource with OpenAPI Spec

## Step 1: Preflight & Context Loading

### Stack Detection
- **Detected Stack**: `backend` (Go / MMv1)
- **Indicators**: `go.mod` found in `mmv1/`, project context indicates Go provider development.

### Prerequisites Verification
- [x] Story approved with clear acceptance criteria.
- [x] Test framework configured (MMv1 Samples Framework).
- [x] Development environment available.

### Story Context
- **Story Key**: `1-1-implement-basic-tool-resource-with-openapi-spec`
- **Story ID**: `1.1`
- **Key Requirements**:
  - Create `Tool.yaml` in `mmv1/products/dialogflow`.
  - Support `open_api_spec` in `specification` oneof block.
  - Basic CRUD support.

### Framework & Existing Patterns
- **Framework**: Magic Modules Samples Framework.
- **Pattern**: `.tf.tmpl` templates in `mmv1/templates/terraform/samples/services/dialogflow/`.
- **Rules**: Use `resource_id_vars` for unique names, standard snake_case for fields.

### TEA Config Flags
- `tea_use_playwright_utils`: true (Note: Generic setting, likely irrelevant for this backend story).
- `tea_use_pactjs_utils`: false
- `tea_pact_mcp`: none
- `tea_browser_automation`: auto
- `test_stack_type`: auto (resolved to backend)

## Step 2: Generation Mode Selection

### Mode Selection
- **Chosen Mode**: AI Generation
- **Reason**: The detected stack is `backend` (Go/MMv1). No browser recording is needed or possible for this declarative resource definition. Scaffolds will be generated based on the story requirements and MMv1 patterns.

## Step 3: Test Strategy

### Map Acceptance Criteria to Scenarios

| AC | Scenario | Level | Priority |
|---|---|---|---|
| 1, 2, 3 | **Scenario 1: Resource Generation & Compilation**<br>- Verify `make provider` succeeds with `Tool.yaml`.<br>- Verify generated code compiles. | Integration (Build) | P0 |
| 4 | **Scenario 2: Basic VCR Acceptance (Create/Read)**<br>- Create Tool with valid OpenAPI spec via Terraform Custom Sample.<br>- Verify successful creation and read status. | Acceptance (VCR) | P0 |
| 4 | **Scenario 3: Basic VCR Acceptance (Update)**<br>- Modify a mutable field in the Tool configuration.<br>- Verify successful update. | Acceptance (VCR) | P0 |
| 4 | **Scenario 4: Basic VCR Acceptance (Delete)**<br>- Destroy the Tool resource.<br>- Verify successful deletion. | Acceptance (VCR) | P0 |

### Test Levels & Selection
- **Detected Stack**: `backend` (Go / MMv1)
- **Primary Focus**: **Acceptance (VCR)** tests using the Magic Modules `samples` framework.
- **Supporting Focus**: **Integration (Build)** tests to ensure generation and compilation succeed.

### Red Phase Requirements
- Scaffolding will consist of the `.tf.tmpl` sample file(s) and the expected YAML configuration (mental model or scratchpad) before implementation starts in `mmv1`.
- Tests will "fail" (or be unrunnable) until the resource is implemented in MMv1.

## TDD Red Phase Summary

✅ Red-phase test scaffolds generated

- API Tests: 1 tests (all skipped)
- E2E Tests: 0 tests (all skipped)

### Acceptance Criteria Coverage

| Acceptance Criteria | Covered By | Level |
|---|---|---|
| Given I have a valid OpenAPI 3.0 specification | `tests/api/dialogflow_tool_openapi.spec.ts` | API |
| When I configure a `google_dialogflow_tool` resource with `open_api_spec` in MMv1 YAML | `tests/api/dialogflow_tool_openapi.spec.ts` | API |

### Next Steps (Task-by-Task Activation)

During implementation of each task:

1. Remove `test.skip()` from the current test file or scenario
2. Run tests: `npm test`
3. Verify the activated test fails first, then passes after implementation (green phase)
4. If any activated tests still fail unexpectedly:
   - Either fix implementation (feature bug)
   - Or fix test (test bug)
5. Commit passing tests

### Implementation Guidance

Feature endpoints to implement:
- POST `/v2/projects/test-project/agent/tools` (or equivalent standard endpoint)

UI components to implement:
- None (Backend Stack)


