---
baseline_commit: NO_VCS
---
# Story 2.1: Expand Generator with All Contexts and Settings

Status: review

## Story

As a CCAI Administrator,
I want to use Coaching, Feedback, and Message Generation contexts in my Generators,
so that I can support diverse Agent Assist use cases.

## Acceptance Criteria

1. **Given** I have the existing `Generator.yaml` with `summarizationContext`
2. **When** I add other contexts (`agent_coaching_context`, `agent_feedback_context`, `customer_message_generation_context`, `free_form_context`, `translation_context`) as mutually exclusive options
3. **Then** `summarizationContext` must be made optional without breaking existing state (Deferred conflict resolution)
4. **And** I can configure `inference_parameter`, `trigger_event`, and `foundation_model`
5. **And** the resource retains `dialogflow_set_endpoint.go.tmpl` custom code

## Tasks / Subtasks

- [x] **Modify `Generator.yaml` to include all contexts (FR1)** (AC: 1, 2, 3)
  - [x] Make `summarizationContext` optional in YAML schema to resolve `Required vs Optional` conflict (AD-1, Deferred Spine Item).
  - [x] Add `free_form_context` as NestedObject.
  - [x] Add `agent_coaching_context` as NestedObject.
  - [x] Add `translation_context` as NestedObject.
  - [x] Add `agent_feedback_context` as NestedObject.
  - [x] Add `customer_message_generation_context` as NestedObject.
  - [x] Ensure DIALOGFLOW_INTERNAL fields are excluded.

- [x] **Enforce Mutual Exclusivity** (AC: 2)
  - [x] Implement `exactly_one_of` or equivalent MMv1 strategy for all context blocks (AD-2).

- [x] **Advanced Configuration Fields (FR2)** (AC: 4)
  - [x] Verify existing `inferenceParameter` and `triggerEvent` cover all required sub-fields/enums.
  - [x] Add `foundation_model` support, ensuring both `published_model` (existing) and `tuned_model` (new) are supported as mutually exclusive/oneof options if applicable, or align with proto definition.

- [x] **Custom Code & Timeouts (AD-4, NFR7)** (AC: 5)
  - [x] Retain `dialogflow_set_endpoint.go.tmpl` custom code.
  - [x] Define explicit `timeouts` blocks.

- [x] **Test Fixtures & Samples (NFR5)**
  - [x] Create dedicated samples/fixtures for at least one new context (e.g., Agent Coaching) to ensure regression testing covers new features.

- [x] **Verification & Downstream Sync**
  - [x] Run downstream sync BEFORE partial generation to prevent masking real errors (Retro Learning).

### Review Findings

- [x] [Review][Patch] Potential breakage of existing state due to `exactly_one_of` on models [mmv1/products/dialogflow/Generator.yaml:289]
- [x] [Review][Patch] Sample contradicts YAML description for Agent Coaching Context version [mmv1/templates/terraform/samples/services/dialogflow/dialogflow_generator_agent_coaching.tf.tmpl:311]

## Dev Notes


### ATDD Artifacts
- **Checklist:** `_bmad-output/test-artifacts/atdd-checklist-2-1-expand-generator-with-all-contexts-and-settings.md`

### Retrospective Learnings & Forward-Looking Constraints
- **Downstream Sync is Critical:** Ensure downstream provider repositories are synced before generating partial resource code to avoid compilation artifacts masking real errors.
- **Operational Timeouts:** Define `timeouts` blocks in the YAML.
- **Drift Detection:** Ensure flattened structure (if AD-2 implies flattening) vs nested is consistently applied. Note: `summarizationContext` is nested, so new contexts should likely follow same pattern unless AD-2 strictly overrides.
- **Vulnerable blind string replacement:** Be aware of `dialogflow_set_endpoint.go.tmpl` potential issues if modified, though it's retained as-is for now.

### Project Structure Notes
- Alignment with `Generator.yaml` location: `mmv1/products/dialogflow/Generator.yaml`.
- Custom code location: `mmv1/templates/terraform/pre_create/dialogflow_set_endpoint.go.tmpl`.

### References
- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.1]
- [Source: _bmad-output/planning-artifacts/prds/prd-magic-modules-2026-07-08/prd.md#FR-1]
- [Source: _bmad-output/planning-artifacts/architecture/architecture-magic-modules-2026-07-08/ARCHITECTURE-SPINE.md#AD-2]
- [Retro: _bmad-output/implementation-artifacts/epic-1-retro-2026-07-08.md]

## Dev Agent Record

### Agent Model Used

gemini-2.5-pro

### Debug Log References

### Completion Notes List
- Expanded `Generator.yaml` with all public contexts as mutually exclusive options.
- Made `summarizationContext` optional.
- Added advanced configuration fields (`tunedModel`, `TOOL_CALL_COMPLETION` trigger event).
- Added explicit `timeouts` block.
- Created `dialogflow_generator_agent_coaching` sample.
- ✅ Resolved review finding [Patch]: Replaced exactly_one_of with conflicts on models to allow 0 model definitions.
- ✅ Resolved review finding [Patch]: Changed version in sample to "2.5" to match YAML description.

### File List
- `mmv1/products/dialogflow/Generator.yaml`
- `mmv1/templates/terraform/samples/services/dialogflow/dialogflow_generator_agent_coaching.tf.tmpl`

### Change Log
- 2026-07-08: Initial implementation of story 2.1.
- 2026-07-08: Addressed code review findings - 2 items resolved.
