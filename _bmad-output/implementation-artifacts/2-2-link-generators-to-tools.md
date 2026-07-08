# Story 2.2: Link Generators to Tools

Status: ready-for-dev

## Story

As a DevOps Engineer,
I want to link my Generators to specific Tools,
so that the Generators can execute external actions.

## Acceptance Criteria

1. Given I have Epic 1 (Tools) implemented
2. When I add the `tools` property to `Generator.yaml`
3. Then I can reference a `google_dialogflow_tool` resource by name/path
4. And the generated Provider includes this reference in the API payload
5. And I can provide a comprehensive sample demonstrating this linkage

## Tasks / Subtasks

- [ ] Add `tools` property to `mmv1/products/dialogflow/Generator.yaml` (AC: 2, 3, 4)
  - [ ] Locate `properties` block in `Generator.yaml`
  - [ ] Add `tools` as an Array of Strings or similar type depending on API spec
- [ ] Create/Update sample linkage (AC: 5)
  - [ ] Create or update a sample in `samples` block demonstrating linking a Generator to a Tool
- [ ] Verify generation (AC: 2)
  - [ ] Run `make provider` to generate downstream provider code
- [ ] Verify functionality (AC: 4)
  - [ ] Ensure the linkage is correctly emitted in the generated Go code

## Dev Notes

- **Persistent Facts & Constraints:**
  - **Testing Strategy:** Standard testing in MMv1 is driven by YAML samples and downstream Go provider tests. Do NOT generate Playwright/TS or Python tests in `tests/` directory as this pollutes the repo and deviates from standard practices.
  - **Security Awareness:** The `Generator.yaml` resource uses `dialogflow_set_endpoint.go.tmpl` which has a known deferred security issue: "Vulnerable blind string replacement in Dialogflow endpoint template" (`mmv1/templates/terraform/pre_create/dialogflow_set_endpoint.go.tmpl:10`). Be aware of this pre-existing condition.
  - **Linkage Implementation:** Generator links to Tool via a simple string field containing the Tool name/path, relying on Terraform dependency ordering (as per AD-3).

- Relevant architecture patterns and constraints: Apply standard MMv1 property definitions.
- Source tree components to touch: `mmv1/products/dialogflow/Generator.yaml`

### Project Structure Notes

- Alignment with unified project structure: Standard MMv1 location.

### References

- Cite all technical details with source paths and sections:
  - [Source: mmv1/products/dialogflow/Generator.yaml]
  - [Source: _bmad-output/planning-artifacts/epics.md#Story 2.2: Link Generators to Tools]
  - [Source: _bmad-output/auto-bmad/retro-notes/epic-2.md] (Constraints on testing)
  - [Source: _bmad-output/implementation-artifacts/deferred-work.md] (Security awareness on template)

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Pro

### Debug Log References

### Completion Notes List

### File List
