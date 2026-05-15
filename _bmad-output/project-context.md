---
project_name: 'magic-modules'
user_name: 'Degraffenreid'
date: '2026-05-15'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 29
optimized_for_llm: true
---

# Project Context for AI Agents

*This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss.*

---

## Technology Stack & Versions

- **Language**: Go (v1.26)
  - *Rule*: Ensure Go version is at least 1.26.0 as specified in `go.mod`.
- **Configuration**: YAML (v2 and v3)
  - *Rule*: Note that `mmv1` depends on `gopkg.in/yaml.v3` while `tpgtools` depends on `gopkg.in/yaml.v2`. Be careful with compatibility.
- **Build System**: GNU Make, Bazel
  - *Rule*: `make` is the primary entry point for generation (`make build`). Bazel is used for building specific components and testing.

## Critical Implementation Rules

### General
- **Environment Verification**: Always run `./scripts/doctor` from the project root to verify your development environment is set up correctly.
- **Workflow**: Follow the standard GitHub flow (Fork, Branch, Pull Request).

### MMv1 Development (Declarative)
- **Resource Configuration**: When adding a resource, create `RESOURCE_NAME.yaml` in the appropriate product folder.
- **Template Cleanup**: After copying the resource template, you **MUST** delete all remaining comments that were copied from the template to keep the configuration clean.

### Handwritten Development (Imperative)
- **Usage Restriction**: New handwritten resources are only accepted if implementing the resource in MMv1 would require entirely overriding two or more CRUD methods.
- **File Location**: Copy generated files from the beta provider to `mmv1/third_party/terraform/services/...`.
- **Import Paths**: Replace all occurrences of `github.com/hashicorp/terraform-provider-google-beta/google-beta` with `github.com/hashicorp/terraform-provider-google/google` in handwritten Go code.
- **Test Naming**: Remove the `Example` suffix from all test function names in handwritten tests.
- **Version Guards**: Use version guards for beta-only code in `.go.tmpl` files: `{{- if ne $.TargetVersionName "ga" -}}...{{- else }}...{{- end }}`.

### Testing Rules

- **Credentials**: Run `gcloud auth application-default login` and set `GOOGLE_USE_DEFAULT_CREDENTIALS=true` before running tests.
- **Environment Variables**: Set `GOOGLE_PROJECT`, `GOOGLE_REGION`, and `GOOGLE_ZONE` for acceptance tests.
- **Acceptance Tests**: Full test runs take over 9 hours. Always run specific tests using the `-run` flag with `make testacc`. Example: `make testacc TEST=./google/services/container TESTARGS='-run=TestAccContainerNodePool_basic$'`.
- **Unit Tests**: Place in `mmv1/third_party/terraform/services/...` as `resource_PRODUCT_RESOURCE_test.go`. Test functions like diff suppress and validation without API calls.
- **Variables in Samples**: In `samples` block in YAML, use `resource_id_vars` for unique identifiers. Use `vars` **ONLY** for fields that change between steps. Hardcode all other values directly in the `.tf.tmpl` file.
- **Skipping VCR Mode**: If a test cannot run in VCR replaying mode (e.g., uses Bigtable or multiple provider aliases), use `skip_vcr: true` in YAML or `acctest.SkipIfVcr(t)` in Go. **Always** include a comment explaining why.
- **Time-based Skips**: Use `acctest.SkipTestUntil(t, "YYYY-MM-DD")` to skip tests until a specific date (e.g., for upcoming launches).

### Code Quality & Style Rules (Diff Handling)

- **API Defaults**: If the API returns a default value for an unset field, prefer setting a matching `default_value` client-side if it's stable. Otherwise, use `default_from_api: true`.
- **API Normalization**: Use appropriate diff suppress functions when the API normalizes values (e.g., `tpgresource.CaseDiffSuppress` for capitalization, `DurationDiffSuppress` for time formats).
- **Sensitive Fields**: Fields that store credentials and are not returned by the API must be marked as `sensitive` and use `ignore_read: true` (or a custom flattener that returns the config value).
- **List Ordering**: If the API returns lists in a different order than sent, use `SortStringsByConfigOrder` or `SortMapsByConfigOrder` in a custom flattener to prevent persistent diffs.
- **Eventual Consistency**: For APIs that are eventually consistent and do not return operations, use a sleep template in `post_create` (e.g., `sleep.go.tmpl`).

### Development Workflow Rules (PRs and CI)

- **Pull Requests**:
  - Ensure each branch/PR contains a **single self-contained change**.
  - Only put **one resource per PR** when adding new resources.
  - Create separate PRs for new fields and bug fixes.
  - Include `Fixes GITHUB_ISSUE_LINK.` in the PR body for each resolved issue.
- **Local Testing**: Strongly recommended to test changes locally before pushing to avoid high latency from CI runs.
- **Troubleshooting CI**: To debug CI failures locally, you can check out the generated code from the `modular-magician` remote using the branch `auto-pr-PR_NUMBER` in the downstream provider repository.

### Critical Don't-Miss Rules

- **Avoid Overrides**: Avoid using custom CRUD methods (`custom_create`, etc.) and `custom_code.extra_schema_entry` unless absolutely necessary. Prefer declarative configuration.
- **Handwritten Code Complexity**: Only create new handwritten resources if implementing them in MMv1 would require overriding two or more CRUD methods. They are harder to maintain.
- **Clean Templates**: Always delete all comments copied from the resource template in your YAML configuration.
- **Sample Variables**: In `samples` for testing, use `vars` **ONLY** for fields that change between steps. Hardcode everything else in the `.tf.tmpl` file.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code.
- Follow ALL rules exactly as documented.
- When in doubt, prefer the more restrictive option.
- Update this file if new patterns emerge.

**For Humans:**

- Keep this file lean and focused on agent needs.
- Update when technology stack changes.
- Review quarterly for outdated rules.
- Remove rules that become obvious over time.

Last Updated: 2026-05-15
