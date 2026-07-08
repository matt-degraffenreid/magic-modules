---
project_name: 'magic-modules'
user_name: 'Degraffenreid'
date: '2026-07-08'
sections_completed:
  ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 28
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Go**: v1.26.0 (specified in `mmv1/go.mod`)
- **Ruby**: Custom template/generation engine under `mmv1/`
- **Build/Task Runners**: Bazel, GNU Make, Go CLI
- **Key Go Dependencies**: `yaml.v3` (v3.0.1), `go-cmp` (v0.7.0), `kin-openapi` (v0.127.0)

## Critical Implementation Rules

### Language-Specific Rules

- **Version Guards in Go Templates**: If handwritten Go code or imports are beta-only, suffix the filename with `.go.tmpl` and wrap the beta-only sections in version guards: `{{- if ne $.TargetVersionName "ga" -}}...{{- else }}...{{- end }}`.
- **Terraform Field Naming**: Always use snake_case for Terraform field names (even if the API uses camelCase or kebab-case).
- **API Enums to Terraform Strings**: Always represent REST API enum fields as `TypeString` in Go schema mappings to preserve forwards-compatibility.
- **Go Mod Tidy/Test constraints**: In magic-modules, do NOT run `go test` or `go mod tidy` directly unless utilizing the make tasks or bazel targets.

### Framework-Specific Rules

- **YAML Field Ordering**: Any new or modified fields in MMv1 YAML files must follow the strict order of fields defined in the `Resource` struct in `mmv1/api/resource.go`.
- **TGC Converter Rules**:
  - Auto-generating converters by marking `include_in_tgc_next: true` is strongly preferred.
  - Do NOT modify templates in `mmv1/templates/terraform` to fix TGC converter failures (modify `mmv1/templates/tgc_next` instead).
  - Do NOT add new fields to `mmv1/api/resource/custom_code.go` or remove existing custom_code constants unless explicitly guided by the user.
- **TGC Encoders and Decoders**: Custom tfplan2cai conversion logic should use `tgc_encoder` (implemented under `mmv1/templates/tgc_next/encoders/`), and custom cai2hcl logic should use `tgc_decoder` (under `mmv1/templates/tgc_next/decoders/`).
- **Prioritize Implementation over Skeleton**: Prioritize actual implementation details (e.g., in YAML files or Go code) over ATDD skeleton assumptions when expanding coverage or fixing tests.

### Testing Rules

- **Acceptance/VCR Tests (MMv1)**:
  - **Minimal Setup**: Use the `samples` framework with `.tf.tmpl` templates inside `mmv1/templates/terraform/samples/services/`.
  - **Unique Names**: Use `resource_id_vars` for identifiers needing uniqueness; they receive `tf-test` (or `tf_test`) prefixes.
  - **Step Variables**: Use `vars` strictly for fields that change values between steps to test updates. Hardcode all other static values.
  - **Beta Guarding**: For beta-only tests, use `min_version: beta` and specify `provider = google-beta` in the resource config blocks.
- **TGC Integration Tests**:
  - **Subtest Format**: For subtests, pass the name as `ParentTest/SubTest`. For new resources, run the top-level test instead of a specific subtest.
  - **Tracing Verification**: For failures, run the tests with `WRITE_FILES=true` and trace the outputs across `Test_roundtrip.tf`, `Test_roundtrip.json`, and `Test_export.tf`.
  - **Schema/Constraint Preservation**: Do NOT modify resource schemas or add `ignore_read_extra` to examples to resolve test failures.
- **Full Generation Fallback**: If generating code for a new resource fails due to missing packages or compilation errors downstream, try a full provider generation (`make provider` or `make tgc`) instead of partial generation.

### Code Quality & Style Rules

- **Scope of Commits**: Only commit files under the `mmv1` folder. Exclude all helper/scratch files (`.txt`, `.py`, `.sh`) from git commits.
- **Comment Integrity**: Retain all existing comments, copyright headers, and docstrings that are unrelated to your changes.
- **YAML Validation**: Keep schema configuration properties clean and descriptive, conforming to the MMv1 Resource reference specification.
- **Linter Checks**: Run standard linters (`make lint`) on the generated downstream provider code before finalizing the PR.

### Development Workflow Rules

- **Source of Truth**: Always drive changes through Magic Modules (`mmv1/`). Never modify files directly in the downstream repositories (`terraform-provider-google` or `terraform-google-conversion`).
- **Downstream Syncing**: Ensure the downstream repository is aligned with Magic Modules by running provider sync targets before implementing features.
- **Verification Loop**:
  1. Modify MMv1 configurations or templates.
  2. Generate downstream provider code using `make provider` (or `make tgc` for TGC).
  3. Compile and build the downstream provider using `make build` (standard/beta provider) or compile TGC code.
  4. Ensure `TGC_DIR` environment variable is set to the active downstream TGC directory prior to running integration tests.

### Critical Don't-Miss Rules

- **Preserve Schemas**: Do NOT change the schema structure (e.g. converting a Required field to Optional or Set) to resolve TGC integration test failures unless explicitly guided.
- **Preserve Exclude Tests**: Do NOT remove `exclude_test: true` from resource examples in YAML files to force TGC test generation; this can break standard provider tests.
- **Immediate Halt on Failure**: For any test/build/verification failure, halt execution immediately. Propose the solution to the user and wait for explicit approval before applying fixes.
- **No Direct Modification**: Under no circumstances should edits be applied directly to the downstream provider/converter repositories. All changes must originate in the `mmv1/` directory of Magic Modules.
- **Durable Constraints**:
  - **Security**: Be aware of pre-existing security issues like vulnerable blind string replacement in shared templates (e.g., Dialogflow endpoint template).
  - **Style**: Avoid redundant paths in `exactly_one_of` and misplaced custom code templates.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: 2026-07-08
