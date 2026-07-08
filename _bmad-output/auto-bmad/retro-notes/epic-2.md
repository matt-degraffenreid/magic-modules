## Story 2-1-expand-generator-with-all-contexts-and-settings
- [Phase 3 — create-story] Folded learnings about downstream sync Criticality and Operational Timeouts from Epic 1 Retro into Story 2.1 Dev Notes.
- [Phase 3 — create-story] Retained dialogflow_set_endpoint.go.tmpl custom code as per invariants, but noted potential 'blind string replacement' issue flagged in deferred work for awareness.
- [Phase 4 — testarch-atdd] Adapted standard TS/Playwright ATDD checklist to Magic Modules YAML/Backend context. Pure Playwright TS scaffolds were skipped in favor of conceptual validation tasks applicable to MMv1 generation.
- [Phase 5 — dev-story] exactly_one_of constraint effectively enforces mutual exclusivity for context blocks in MMv1.
- [Phase 5 — dev-story] Making summarizationContext optional preserved backward compatibility while supporting new contexts.
- [Phase 6 — testarch-automate] Subagent generated Playwright/TS and Python tests in tests/ directory, which do not align with the project's primary language (Go) or standard Magic Modules testing practices.
- [Phase 6 — testarch-automate] These files were left untracked/removed to avoid polluting the repo, as standard testing in MMv1 is driven by YAML samples and downstream Go provider tests.

## Story 2-2-link-generators-to-tools
- Fixed generation-blocking errors in Tool samples ($.Project replaced with test-project).
- Upgraded Generator linkage sample to use real resource reference.
