---
workflowStatus: 'completed'
totalSteps: 5
stepsCompleted: ['step-01-detect-mode', 'step-02-load-context', 'step-03-risk-and-testability', 'step-04-coverage-plan', 'step-05-generate-output']
lastStep: 'step-05-generate-output'
nextStep: ''
lastSaved: '2026-07-08T19:54:15Z'
---

# Step 1: Detect Mode & Prerequisites

## Mode Confirmation
- **Selected Mode:** Epic-Level Mode
- **Reason:** Explicit user instruction to focus on Epic 2.

## Prerequisite Check
- **Epic Requirements:** Available in `_bmad-output/planning-artifacts/epics.md`.
- **Stories:**
  - Story 2.1: Expand Generator with All Contexts and Settings
  - Story 2.2: Link Generators to Tools
- **Acceptance Criteria:** Defined in `epics.md`.
- **Architecture Context:** Available in `_bmad-output/planning-artifacts/architecture/architecture-magic-modules-2026-07-08/ARCHITECTURE-SPINE.md` (referenced in `epics.md`).

# Step 2: Load Context & Knowledge Base

## Configuration
- `tea_use_playwright_utils`: true
- `tea_use_pactjs_utils`: false
- `tea_pact_mcp`: none
- `tea_browser_automation`: auto
- `test_stack_type`: auto (Detected: Go/Backend)

## Loaded Artifacts
- **PRD:** `_bmad-output/planning-artifacts/prds/prd-magic-modules-2026-07-08/prd.md`
- **Architecture Spine:** `_bmad-output/planning-artifacts/architecture/architecture-magic-modules-2026-07-08/ARCHITECTURE-SPINE.md`
- **Epics:** `_bmad-output/planning-artifacts/epics.md`
- **Prior Test Design Architecture:** `_bmad-output/test-artifacts/test-design-architecture.md`
- **Prior Test Design QA:** `_bmad-output/test-artifacts/test-design-qa.md`

## Loaded Knowledge Fragments
- `risk-governance.md`
- `probability-impact.md`
- `test-levels-framework.md`
- `test-priorities-matrix.md`

# Step 3: Testability & Risk Assessment

## Risk Assessment (Epic 2 Focus)

| Risk ID | Category | Description | Probability | Impact | Score | Mitigation |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **R-BACKWARD-01** | **TECH/BUS** | Breaking existing `summarizationContext` users | 2 | 3 | **6** | Strict regression testing on existing Generator samples. |
| **R-TECH-01** | **TECH** | Complex nested `oneof` structures lead to generation errors | 2 | 2 | 4 | Use standard MMv1 patterns, verify generated Go code. |
| **R-OPS-01** | **OPS** | Operational timeouts cause test failures if backend is slow | 2 | 2 | 4 | Define explicit `timeouts` blocks in YAML. |
| **R-LINK-01** | **TECH** | Linkage failure between Generator and Tool | 2 | 2 | 4 | Verify linkage via integration tests with realistic samples. |

## NFR Planning Assessment
- **Maintainability (Backward Parity):** Threshold is 0 breaking changes for `summarizationContext`.
- **Reliability (Operational Timeouts):** Threshold is TBD (need to define in YAML).

## Risk Summary
- **Highest Risk:** R-BACKWARD-01 (Score 6) requires immediate attention to ensure backward compatibility.
- Other risks are medium (Score 4) and can be managed via standard testing practices.

# Step 4: Coverage Plan & Execution Strategy

## Coverage Matrix (Epic 2 Focus)

| Test ID | Requirement | Test Level | Priority | Notes |
| :--- | :--- | :--- | :---: | :--- |
| **GEN-01** | CRUD Generator with `free_form_context` | Integration (Acceptance) | P0 | Basic CRUD |
| **GEN-02** | CRUD Generator with `agent_coaching_context` + Tool | Integration (Acceptance) | P0 | Multi-resource link |
| **GEN-03** | CRUD Generator with `summarization_context` | Integration (Acceptance) | P0 | Regression |
| **GEN-04** | CRUD Generator with `translation_context` | Integration (Acceptance) | P1 | Beta feature |
| **GEN-05** | CRUD Generator with `agent_feedback_context` | Integration (Acceptance) | P1 | Advanced context |
| **GEN-06** | CRUD Generator with `customer_message_generation_context` | Integration (Acceptance) | P1 | Advanced context |
| **GEN-07** | CRUD Generator with advanced fields (inference, trigger, foundation) | Integration (Acceptance) | P1 | Feature completeness |

## NFR Coverage and Evidence Plan
- **Maintainability (Backward Parity):** GEN-03 passing is evidence.
- **Reliability (Operational Timeouts):** Verify YAML block (Inspection).

## Execution Strategy
- **PR:** All functional tests (GEN-01 to GEN-07) run on every PR if execution time is <15 mins.

## Resource Estimates
- **P0 Scenarios:** ~15–20 hours
- **P1 Scenarios:** ~10–15 hours
- **Total:** ~25–35 hours

## Quality Gates
- P0 pass rate = 100%
- P1 pass rate ≥ 95%
- High-risk mitigations (R-BACKWARD-01) complete before release.
- Coverage target ≥ 80% of identified scenarios.

# Step 5: Generate Outputs & Validate

## Generated Outputs
- `_bmad-output/test-artifacts/test-design-epic-2.md`

## Validation
- Output generated using `test-design-template.md`.
- All required sections (Risk, Coverage, NFR, etc.) populated.
- Focused on Epic 2 scope.




