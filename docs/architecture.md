# Architecture Documentation

## Executive Summary
Magic Modules is a tool used to generate Terraform providers for Google Cloud Platform (GCP). It takes resource definitions in YAML format and generates the corresponding Go code for the Terraform provider, ensuring consistency and reducing manual effort.

## Technology Stack
- **Language**: Go (v1.26)
- **Configuration**: YAML (v2 and v3)
- **Build System**: GNU Make, Bazel

## Architecture Pattern
The project follows a **Code Generation Pipeline** pattern. It reads declarative definitions of cloud resources and applies templates to generate source code.

## Component Overview
- **mmv1**: The main generation engine. It loads product definitions, resolves overrides, and applies templates to generate code and documentation.
- **tpgtools**: An alternative or newer generation tool included in the repository, also Go-based.
- **tools/**: A collection of helper utilities for various tasks like diff processing and label checking.

## Source Tree
For a detailed breakdown of the directory structure, see [Source Tree Analysis](./source-tree-analysis.md).

## Development Workflow
Development is driven by Go and Make.
- **Build**: `make build` (requires setting `OUTPUT_PATH` and `VERSION`)
- **Test**: `make test` runs unit tests for the generator.

Detailed guides can be found in the `docs/content/` directory.

## Testing Strategy
The project relies on unit tests written in Go to verify the generator logic. Integration testing typically happens by running the generated provider against GCP.
