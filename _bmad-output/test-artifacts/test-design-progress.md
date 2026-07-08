---
workflowStatus: 'completed'
totalSteps: 5
stepsCompleted: ['step-01-detect-mode', 'step-02-load-context', 'step-03-risk-and-testability', 'step-04-coverage-plan', 'step-05-generate-output']
lastStep: 'step-05-generate-output'
nextStep: ''
lastSaved: '2026-07-08'
inputDocuments:
  - '_bmad-output/planning-artifacts/epics.md'
  - '_bmad-output/planning-artifacts/prds/prd-magic-modules-2026-07-08/prd.md'
  - '_bmad-output/planning-artifacts/architecture/architecture-magic-modules-2026-07-08/ARCHITECTURE-SPINE.md'
  - '_bmad-output/test-artifacts/test-design-architecture.md'
  - '_bmad-output/test-artifacts/test-design-qa.md'
---
# Step 1: Detect Mode & Prerequisites

## Mode Confirmation
- **Selected Mode**: Epic-Level Mode
- **Reason**: User explicitly requested Epic-Level mode for Epic 1.

## Prerequisite Check
- **Epic/Story Requirements**: Available in `_bmad-output/planning-artifacts/epics.md`.
- **Architecture Context**: Available in `_bmad-output/planning-artifacts/architecture/architecture-magic-modules-2026-07-08/ARCHITECTURE-SPINE.md`.

# Step 2: Load Context & Knowledge Base

## Configuration Loaded
- `tea_use_playwright_utils`: true
- `tea_use_pactjs_utils`: false
- `tea_pact_mcp`: none
- `tea_browser_automation`: auto
- `test_stack_type`: auto (Inferred: backend)

## Project Artifacts Loaded
- **Epic/Story Requirements**: `_bmad-output/planning-artifacts/epics.md`
- **PRD**: `_bmad-output/planning-artifacts/prds/prd-magic-modules-2026-07-08/prd.md`
- **Architecture**: `_bmad-output/planning-artifacts/architecture/architecture-magic-modules-2026-07-08/ARCHITECTURE-SPINE.md`
- **System-Level Design**: `_bmad-output/test-artifacts/test-design-architecture.md`, `test-design-qa.md`

## Knowledge Fragments Loaded
- `risk-governance.md`
- `probability-impact.md`
- `test-levels-framework.md`
- `test-priorities-matrix.md`

## Existing Test Analysis
- Found `resource_dialogflow_generator_test.go` in `mmv1/third_party/terraform/services/dialogflow/`.
- Tests cover `summarization_context` CRUD.
- No tests for `Tool` resource or other contexts yet (as expected for new features).

# Step 3: Testability & Risk Assessment

## Risk Assessment

| Category | Risk | Probability (1-3) | Impact (1-3) | Score (P×I) | High | Mitigation |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **SEC** | Credentials (API Key, OAuth secrets) might leak if not masked correctly | 2 | 3 | **6** | ✅ | Ensure `sensitive: true` in YAML for auth fields in `Tool.yaml`. |
| **TECH**| Complex nested `oneof` structures lead to generation errors | 2 | 2 | 4 | | Use standard MMv1 patterns (NestedObject/array). |
| **OPS**  | Operational timeouts cause test failures if backend is slow | 2 | 2 | 4 | | Define explicit `timeouts` blocks in `Tool.yaml`. |
| **BUS**  | Incomplete specification support impedes user adoption | 1 | 2 | 2 | | Verify coverage of all specs in acceptance tests. |

## NFR Planning Assessment

- **Security**: Sensitive field masking.
  - **Thresholds**: Binary (Yes/No).
  - **Evidence**: YAML inspection, generated code check.
- **Performance**: Operation timeouts.
  - **Thresholds**: **UNKNOWN** (Explicit values missing in PRD/Epics).
  - **Evidence**: YAML timeout verification.

### NFR Gaps
- Performance timeouts are unknown -> OPS risk (Score 4).

## Summary of Risk Findings
- **Highest Risk**: Security leak of credentials (Score 6). Mitigation is critical (`sensitive: true`).
- **Medium Risks**: Complexity of `oneof` (TECH) and Unknown Timeouts (OPS).

# Step 4: Coverage Plan & Execution Strategy

## Coverage Matrix

| ID | Scenario | Test Level | Priority | NFR/Risk Linked |
| :--- | :--- | :--- | :---: | :--- |
| **TOOL-01** | CRUD Tool with `open_api_spec` (No Auth) | Integration (Acceptance) | P0 | Core Feature (Story 1.1) |
| **TOOL-02** | CRUD Tool with `open_api_spec` + API Key Auth | Integration (Acceptance) | P0 | SEC Risk (Story 1.2) |
| **TOOL-03** | CRUD Tool with `open_api_spec` + OAuth | Integration (Acceptance) | P0 | SEC Risk (Story 1.2) |
| **TOOL-04** | CRUD Tool with `function_spec` | Integration (Acceptance) | P0 | Core Feature (Story 1.2) |
| **TOOL-05** | CRUD Tool with `connector_spec` | Integration (Acceptance) | P1 | Feature Completeness (Story 1.2) |
| **TOOL-06** | CRUD Tool with `data_store_spec` | Integration (Acceptance) | P1 | Feature Completeness (Story 1.2) |
| **NFR-SEC** | Verify sensitive fields are masked in logs/state | Unit/Inspection | P0 | SEC Risk |
| **NFR-OPS** | Verify resource handles long operations via timeouts | Integration (Acceptance) | P1 | OPS Risk (Timeouts) |

## NFR Coverage and Evidence Plan

- **Security**: Sensitive Field Masking.
  - **Scenario**: Code inspection of generated code, check Terraform output in tests.
  - **Validation Level**: Unit/Inspection.
  - **Evidence**: Code snippet (`sensitive: true`), Terraform log masking.
- **Performance**: Timeouts.
  - **Scenario**: Verify operation completes within configured timeouts.
  - **Validation Level**: Integration (Acceptance).
  - **Evidence**: Test execution logs.

## Execution Strategy

- **PR**: All P0/P1 Acceptance tests must pass (Target <15 mins total).
- **Nightly/Weekly**: None needed for MVP unless stress testing is added.

## Resource Estimates

- **P0 Scenarios**: ~20–30 hours
- **P1 Scenarios**: ~15–25 hours
- **NFR Verification**: ~5–10 hours
- **Total**: ~40–65 hours

## Quality Gates

- **P0 Pass Rate**: 100%
- **P1 Pass Rate**: ≥ 95%
- **Coverage Target**: 1 explicit `sample` per variant/feature in YAML.
- **Security Mitigation**: 100% masking of auth fields verified before PR merge.

# Step 5: Generate Outputs & Validate

## Completion Report
- **Mode Used**: Epic-Level Mode (Epic 1)
- **Output File**: `_bmad-output/test-artifacts/test-design-epic-1.md`
- **Key Risks**: Security leak of credentials (Score 6).
- **Gate Thresholds**: 100% P0 pass rate required.
- **Open Assumptions**: API stability and accessibility.
