# Source Tree Analysis

This document provides an overview of the directory structure of the `magic-modules` project and the purpose of its critical components.

## Directory Tree

```
magic-modules/
├── .github/            # GitHub configuration, issue templates, and workflows
│   └── workflows/      # CI/CD pipelines
├── docs/               # Documentation source code (Hugo website)
├── mmv1/               # Magic Modules v1 generator
│   ├── api/            # API definitions and models for resources
│   ├── products/       # YAML definitions of GCP products and resources
│   ├── templates/      # Go templates for generating Terraform code
│   └── main.go         # Entry point for mmv1 generator
├── tpgtools/           # Another generator tool (newer or alternative)
│   ├── templates/      # Templates for tpgtools
│   └── main.go         # Entry point for tpgtools
├── tools/              # Helper tools and utilities
│   ├── diff-processor/
│   └── ...
├── GNUmakefile         # Top-level makefile for orchestrating builds and generation
└── BUILD.bazel         # Bazel build file for the repository root
```

## Critical Folders

- **mmv1/**: This is the core of the Magic Modules generator. It reads the YAML files in `products/` and uses the templates in `templates/` to generate the Terraform provider code.
- **tpgtools/**: Another generation tool, likely used for specific resources or newer generation patterns.
- **docs/**: Contains the source for the documentation website.
- **.github/workflows/**: Defines the continuous integration and delivery pipelines.

## Entry Points

- **mmv1/main.go**: The main execution entry point for the MMv1 generator.
- **tpgtools/main.go**: The main execution entry point for the tpgtools generator.
