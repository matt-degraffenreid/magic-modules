---
workflowStatus: 'in-progress'
totalSteps: 5
stepsCompleted: ['step-01-detect-mode', 'step-02-load-context', 'step-03-risk-and-testability', 'step-04-coverage-plan', 'step-05-generate-output']
lastStep: 'step-05-generate-output'
nextStep: ''
lastSaved: '2026-07-08T19:54:00Z'
---

# Test Design: Epic 2 - Enhance LLM Generators with Full Context Support

**Date:** 2026-07-08
**Author:** Degraffenreid
**Status:** Draft

---

## Executive Summary

**Scope:** Epic-level test design for Epic 2 (Enhance LLM Generators with Full Context Support).

**Risk Summary:**

- Total risks identified: 4
- High-priority risks (≥6): 1 (R-BACKWARD-01)
- Critical categories: TECH, OPS

**Coverage Summary:**

- P0 scenarios: 3 (~15–20 hours)
- P1 scenarios: 4 (~10–15 hours)
- P2/P3 scenarios: 0
- **Total effort**: ~25–35 hours

---

## Not in Scope

| Item | Reasoning | Mitigation |
| :--- | :--- | :--- |
| **Dialogflow CX Generators** | Handled in separate product `dialogflowcx` | N/A |
| **GeneratorEvaluation** | Operational, not IaC | N/A |

---

## Risk Assessment

### High-Priority Risks (Score ≥6)

| Risk ID | Category | Description | Probability | Impact | Score | Mitigation | Owner | Timeline |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| **R-BACKWARD-01** | **TECH/BUS**| Breaking existing `summarizationContext` users | 2 | 3 | **6** | Strict regression testing on existing Generator samples. | Dev | Pre-merge |

### Medium-Priority Risks (Score 3-4)

| Risk ID | Category | Description | Probability | Impact | Score | Mitigation | Owner |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| R-TECH-01 | TECH | Complex nested `oneof` structures lead to generation errors | 2 | 2 | 4 | Use standard MMv1 patterns, verify generated Go code. | Dev |
| R-OPS-01 | OPS | Operational timeouts cause test failures if backend is slow | 2 | 2 | 4 | Define explicit `timeouts` blocks in YAML. | Dev |
| R-LINK-01 | TECH | Linkage failure between Generator and Tool | 2 | 2 | 4 | Verify linkage via integration tests with realistic samples. | Dev |

### Low-Priority Risks (Score 1-2)

No low-priority risks identified specifically for this epic scope.

### Risk Category Legend

- **TECH**: Technical/Architecture (flaws, integration, scalability)
- **SEC**: Security (access controls, auth, data exposure)
- **PERF**: Performance (SLA violations, degradation, resource limits)
- **DATA**: Data Integrity (loss, corruption, inconsistency)
- **BUS**: Business Impact (UX harm, logic errors, revenue)
- **OPS**: Operations (deployment, config, monitoring)

---

## NFR Planning

**Purpose:** Capture epic-specific NFR thresholds, planned validation, and evidence expected for later `nfr-assess`.

| NFR Category | Requirement / Threshold | Risk Link | Planned Validation | Evidence Needed |
| :--- | :--- | :--- | :--- | :--- |
| Maintainability | Backward Parity | R-BACKWARD-01 | Integration (Acceptance) Tests | Test reports (GEN-03 passing) |
| Reliability | Operational Timeouts | R-OPS-01 | Inspection | YAML block verification |

**Unknown thresholds:** Specific timeout values are TBD.

---

## Entry Criteria

- [x] Requirements and assumptions agreed upon by QA, Dev, PM (via PRD)
- [ ] Test environment provisioned and accessible
- [ ] Test data available or factories ready
- [ ] Feature deployed to test environment
- [ ] Epic 2 stories and acceptance criteria defined in `epics.md`.

## Exit Criteria

- [ ] All P0 tests passing
- [ ] All P1 tests passing (or failures triaged)
- [ ] No open high-priority / high-severity bugs
- [ ] Test coverage agreed as sufficient
- [ ] Regression testing confirms no impact on existing `summarizationContext`.

---

## Test Coverage Plan

### P0 (Critical) - Run on every commit

**Criteria**: Blocks core journey + High risk (≥6) + No workaround

| Requirement | Test Level | Risk Link | Test Count | Owner | Notes |
| :--- | :--- | :--- | :---: | :--- | :--- |
| CRUD Generator with `free_form_context` | Integration (Acceptance) | R-TECH-01 | 1 | QA | Basic CRUD |
| CRUD Generator with `agent_coaching_context` + Tool | Integration (Acceptance) | R-LINK-01 | 1 | QA | Multi-resource link |
| CRUD Generator with `summarization_context` | Integration (Acceptance) | R-BACKWARD-01 | 1 | QA | Regression |

**Total P0**: 3 tests, ~15–20 hours

### P1 (High) - Run on PR to main

**Criteria**: Important features + Medium risk (3-4) + Common workflows

| Requirement | Test Level | Risk Link | Test Count | Owner | Notes |
| :--- | :--- | :--- | :---: | :--- | :--- |
| CRUD Generator with `translation_context` | Integration (Acceptance) | | 1 | QA | Beta feature |
| CRUD Generator with `agent_feedback_context` | Integration (Acceptance) | | 1 | QA | Advanced context |
| CRUD Generator with `customer_message_generation_context` | Integration (Acceptance) | | 1 | QA | Advanced context |
| CRUD Generator with advanced fields | Integration (Acceptance) | | 1 | QA | Inference params, etc. |

**Total P1**: 4 tests, ~10–15 hours

---

## Execution Order

### P0 Tests (<10 min)

**Purpose**: Critical path validation

- [ ] GEN-01: CRUD Generator with `free_form_context`
- [ ] GEN-02: CRUD Generator with `agent_coaching_context` + Tool
- [ ] GEN-03: CRUD Generator with `summarization_context`

### P1 Tests (<30 min)

**Purpose**: Important feature coverage

- [ ] GEN-04: CRUD Generator with `translation_context`
- [ ] GEN-05: CRUD Generator with `agent_feedback_context`
- [ ] GEN-06: CRUD Generator with `customer_message_generation_context`
- [ ] GEN-07: CRUD Generator with advanced fields

---

## Resource Estimates

### Test Development Effort

| Priority | Count | Hours/Test (Eng) | Total Hours | Notes |
| :--- | :--- | :--- | :--- | :--- |
| P0 | 3 | ~5-7 | ~15–20 | Setup samples, verify regression |
| P1 | 4 | ~2-4 | ~10–15 | Standard coverage, advanced fields |
| **Total** | **7** | **-** | **~25–35** | **~3-5 days** |

### Prerequisites

**Test Data:**

- Realistic samples for each context type.
- Unique resource IDs to prevent collision.

**Tooling:**

- Magic Modules standard test framework (Go tests).

**Environment:**

- GCP project with Dialogflow v2beta1 enabled.

---

## Quality Gate Criteria

### Pass/Fail Thresholds

- **P0 pass rate**: 100% (no exceptions)
- **P1 pass rate**: ≥95% (waivers required for failures)
- **High-risk mitigations**: 100% complete or approved waivers

### Coverage Targets

- **Critical paths**: 100% (All contexts covered)
- **Security scenarios**: N/A (covered in Epic 1)
- **Business logic**: ≥80%

### Non-Negotiable Requirements

- [ ] All P0 tests pass
- [ ] No high-risk (≥6) items unmitigated (R-BACKWARD-01)
- [ ] Regression tests confirm no impact on existing features.

---

## Mitigation Plans

### R-BACKWARD-01: Breaking existing `summarizationContext` users (Score: 6)

**Mitigation Strategy:** Strict regression testing on existing Generator samples. Ensure new fields are optional and do not conflicting with existing required fields.
**Owner:** Dev
**Timeline:** Pre-merge
**Status:** Planned
**Verification:** Run existing tests against new code.

---

## Assumptions and Dependencies

### Assumptions

1. The Dialogflow v2beta1 API is accessible and stable for testing.
2. Standard MMv1 test setup is sufficient.

### Dependencies

1. Epic 1 (Tools) is available for linkage tests (GEN-02).

### Risks to Plan

- **Risk**: Delay in Epic 1 implementation.
  - **Impact**: Cannot test GEN-02.
  - **Contingency**: Mock tool linkage or defer GEN-02.

---

## Follow-on Workflows (Manual)

- Run `*atdd` to generate failing P0 tests.
- Run `*automate` for broader coverage once implementation exists.

---

## Approval

**Test Design Approved By:**

- [ ] Product Manager: Date:
- [ ] Tech Lead: Date:
- [ ] QA Lead: Date:

---

## Interworking & Regression

| Service/Component | Impact | Regression Scope |
| :--- | :--- | :--- |
| **Generator** | Expanding Contexts | Existing `summarizationContext` tests |

---

## Appendix

### Knowledge Base References

- `risk-governance.md` - Risk classification framework
- `probability-impact.md` - Risk scoring methodology
- `test-levels-framework.md` - Test level selection
- `test-priorities-matrix.md` - P0-P3 prioritization

### Related Documents

- PRD: `_bmad-output/planning-artifacts/prds/prd-magic-modules-2026-07-08/prd.md`
- Epics: `_bmad-output/planning-artifacts/epics.md`
- Architecture: `_bmad-output/planning-artifacts/architecture/architecture-magic-modules-2026-07-08/ARCHITECTURE-SPINE.md`

---

**Generated by**: BMad TEA Agent - Test Architect Module
**Workflow**: `bmad-testarch-test-design`
**Version**: 4.0 (BMad v6)
