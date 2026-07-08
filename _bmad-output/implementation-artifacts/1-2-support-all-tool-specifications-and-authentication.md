---
baseline_commit: NO_VCS
---
# Story 1.2: Support All Tool Specifications and Authentication

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a CCAI Administrator,
I want to configure Function, Connector, and Data Store specifications for my Tools,
so that I can use diverse data sources and actions.

## Acceptance Criteria

1. **Given** I have Story 1.1 implemented
2. **When** I add `function_spec`, `connector_spec`, and `data_store_spec` to `Tool.yaml`
3. **Then** all specification blocks are mutually exclusive in the generated schema
4. **And** I can configure API Key, OAuth, Service Agent, and Bearer authentication
5. **And** fields carrying authentication credentials are marked `sensitive: true`

## Tasks / Subtasks

- [x] Task 1: Update `Tool.yaml` with missing specification blocks (AC: 2, 3)
  - [x] Add `functionSpec` to `properties`
  - [x] Add `connectorSpec` to `properties`
  - [x] Add `dataStoreSpec` to `properties`
  - [x] Ensure all specs are documented as mutually exclusive (flattened oneof pattern)
- [x] Task 2: Implement Authentication configurations (AC: 4, 5)
  - [x] Add `authentication` block to `openApiSpec` properties
  - [x] Support `apiKeyConfig`, `oauthConfig`, `serviceAgentAuthConfig`, and `bearerTokenConfig`
  - [x] Mark credential fields (API Key, Client Secret, Token) as `sensitive: true`
- [x] Task 3: Verify and Generate (AC: 3)
  - [x] Run `make provider`
  - [x] Verify compilation and schema in downstream repo

## Dev Notes

- **Architecture Pattern**: Configuration-driven resource definition (MMv1 Declarative YAML).
- **Oneof Strategy**: Implement API `oneof` blocks (specification in Tool) as mutually exclusive top-level NestedObjects in MMv1 YAML (AD-2). Do NOT create a wrapper `specification` object.
- **Flattened Oneof**: The `specification` oneof in `Tool.proto` is implemented as mutually exclusive top-level `NestedObject` fields in `Tool.yaml` (e.g., `openApiSpec`, `functionSpec`).
- **Security**: Fields carrying authentication credentials (API Key, Client Secret, Token) MUST be marked as `sensitive: true`.
- **Reference**: Use `mmv1/products/dialogflowcx/Tool.yaml` as a reference for field structures, especially for complex specs and auth configs, but verify compatibility with v2beta1.
- **Source tree components to touch**:
  - `mmv1/products/dialogflow/Tool.yaml` (Update)

### Project Structure Notes

- Alignment with unified project structure: Updates existing `Tool.yaml` under `mmv1/products/dialogflow`.
- Detected conflicts or variances: None. Prioritizing alignment with implementation pattern established in Story 1.1 (flattened oneof).

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2]
- [Source: _bmad-output/planning-artifacts/architecture/architecture-magic-modules-2026-07-08/ARCHITECTURE-SPINE.md#AD-2, AD-3]
- [Source: _bmad-output/planning-artifacts/prds/prd-magic-modules-2026-07-08/prd.md#FR-3, FR-4]
- [Source: mmv1/products/dialogflowcx/Tool.yaml] (Reference for structure)

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Pro

### Debug Log References

### Completion Notes List

- Updated `Tool.yaml` with `functionSpec`, `connectorSpec`, and `dataStoreSpec`.
- Expanded `openApiSpec` with detailed `authentication` configuration supporting API Key, OAuth, Service Agent, and Bearer Token.
- Marked all sensitive credential fields as `sensitive: true`.
- Verified mutually exclusive documentation for specifications.
- Generated provider and verified successful compilation.

### File List

- `mmv1/products/dialogflow/Tool.yaml`

### Review Findings

- [x] [Review][Decision][Med] Sample references undefined field fallback_prompt — Sample specifies fallback_prompt but field is missing from schema. Recommended: fix: Add fallbackPrompt to Tool.yaml under dataStoreSpec to match dialogflowcx if supported in v2beta1.
- [x] [Review][Patch][Med] Specification Mutual Exclusivity not enforced in schema [mmv1/products/dialogflow/Tool.yaml:74]
- [x] [Review][Patch][Med] Authentication Mutual Exclusivity not enforced in schema [mmv1/products/dialogflow/Tool.yaml:80]




