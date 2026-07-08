---
baseline_commit: 96c1e6bb53a8f7331b43c9e41a213a899c8287ae
---
# Story 1.1: Implement Basic Tool Resource with OpenAPI Spec

Status: review

## Story

As a DevOps Engineer,
I want to create a Dialogflow Tool resource with an OpenAPI specification,
so that I can expose external APIs to my Generators.

## Acceptance Criteria

1. **Given** I have a valid OpenAPI 3.0 specification
2. **When** I configure a `google_dialogflow_tool` resource with `open_api_spec` in MMv1 YAML
3. **Then** the resource should be created successfully via `make provider`
4. **And** the generated Provider should support CRUD operations for the Tool
5. **And** sensitive fields (if any in auth) are not masked yet (handled in later story)

## Tasks / Subtasks

- [x] Task 1: Create Tool.yaml in `mmv1/products/dialogflow` (AC: 2)
  - [x] Define basic resource metadata (name, description, base_url, self_link)
  - [x] Add `specification` oneof block with `open_api_spec`
  - [x] Add `open_api_spec` properties (textSchema)
- [x] Task 2: Generate Provider (AC: 3, 4)
  - [x] Run `make provider`
  - [x] Verify compilation of the new resource
- [x] Task 3: Validate basic functionality (AC: 4)
  - [x] Ensure standard CRUD methods are generated

## Dev Notes

- **Architecture Pattern**: Configuration-driven resource definition (MMv1 Declarative YAML).
- **Custom Code**: Use `dialogflow_set_endpoint.go.tmpl` for endpoint configuration (AD-4).
- **oneof Strategy**: Implement API `oneof` blocks (specification in Tool) as mutually exclusive top-level NestedObjects or arrays in MMv1 YAML (AD-2).
- **Source tree components to touch**:
  - `mmv1/products/dialogflow/Tool.yaml` (New)
- **Testing standards summary**: Self-contained acceptance samples are required for every variant (NFR5). For this story, a basic sample with OpenAPI spec is needed.

### ATDD Artifacts

- **Checklist**: `_bmad-output/test-artifacts/atdd-checklist-1-1-implement-basic-tool-resource-with-openapi-spec.md`
- **API tests**: `tests/api/dialogflow_tool_openapi.spec.ts`

### Project Structure Notes


- Alignment with unified project structure: New resource file `Tool.yaml` under `mmv1/products/dialogflow`.
- Detected conflicts or variances: None.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1]
- [Source: _bmad-output/planning-artifacts/architecture/architecture-magic-modules-2026-07-08/ARCHITECTURE-SPINE.md#AD-2, AD-4]
- [Source: _bmad-output/planning-artifacts/prds/prd-magic-modules-2026-07-08/prd.md#FR-3]

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Pro

### Debug Log References

### Completion Notes List
- Created Tool.yaml with basic metadata and OpenAPI spec support.
- Generated provider and verified compilation.
- Verified standard CRUD methods are generated.

### File List
- `mmv1/products/dialogflow/Tool.yaml`

### Review Findings

- [x] [Review][Decision][Med] Inconsistency in `specification` structure (Flattened vs Nested) — Implementation in `Tool.yaml` flattens `specification` into `openApiSpec` (AD-2), contradicting Spec Task 1. Test fixture `test-data.ts` uses wrapper, but API test uses flattened. Verify API expectations and align. Recommended: fix: Verify API payload structure and align files.
- [x] [Review][Decision][Low] Missing `displayName` field — Field present in `test-data.ts` fixture but missing in `Tool.yaml`. Clarify if needed by API. Recommended: fix: Add displayName to Tool.yaml if supported by API.
