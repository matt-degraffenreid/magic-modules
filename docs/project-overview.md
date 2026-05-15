# Project Overview

## Project Name
`magic-modules`

## Purpose
Magic Modules is a tool designed to generate Terraform providers for Google Cloud Platform (GCP). It aims to automate the creation of provider code by using declarative definitions of cloud resources, thereby ensuring consistency and reducing manual coding errors.

## Technology Stack
- **Primary Language**: Go
- **Configuration**: YAML
- **Build Tools**: Make, Bazel

## Architecture Type
**Code Generation Pipeline**. The project reads YAML definitions and processes them through templates to generate Go code.

## Repository Structure
Treated as a **Monolith** (single cohesive project) for documentation purposes, containing main tools in `mmv1` and `tpgtools`.

## Detailed Documentation
- [Architecture](./architecture.md)
- [Source Tree Analysis](./source-tree-analysis.md)
- [Development Guide](./development-guide.md) (To be generated)
