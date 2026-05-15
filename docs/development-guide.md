# Development Guide

This guide provides comprehensive instructions for setting up, developing, and testing in the `magic-modules` project.

## Prerequisites
- **Go**: Ensure Go is installed (version specified in `go.mod` files, e.g., 1.26).
- **Make**: GNU Make is used for orchestrating builds.
- **Git**: For version control.
- **gcloud CLI**: Required for authentication and testing.
- **Terraform**: For testing the generated providers.

## Environment Setup

1.  **Install Tools**: Install Go, Git, gcloud CLI, and Terraform.
2.  **Go Path**: Add the following to your environment settings (e.g., `.bashrc`):
    ```bash
    export GOPATH=$(go env GOPATH)
    export PATH=$PATH:$(go env GOPATH)/bin
    ```
3.  **Clone Repositories**:
    ```bash
    git clone https://github.com/GoogleCloudPlatform/magic-modules.git
    git clone https://github.com/hashicorp/terraform-provider-google.git $GOPATH/src/github.com/hashicorp/terraform-provider-google
    git clone https://github.com/hashicorp/terraform-provider-google-beta.git $GOPATH/src/github.com/hashicorp/terraform-provider-google-beta
    ```
4.  **Verify Setup**: Run the doctor script from the `magic-modules` root:
    ```bash
    ./scripts/doctor
    ```

## Generating Providers

To generate provider code from Magic Modules, you need to set environment variables and run `make`.

1.  Set environment variables:
    ```bash
    export OUTPUT_PATH=$GOPATH/src/github.com/hashicorp/terraform-provider-google
    export VERSION=ga # or beta
    ```
2.  Run build:
    ```bash
    make build
    ```

## Testing

### Automated Tests

Before running tests, set up credentials and project info:
```bash
gcloud auth application-default login
export GOOGLE_USE_DEFAULT_CREDENTIALS=true
export GOOGLE_PROJECT=YOUR_PROJECT_ID
export GOOGLE_REGION=us-central1
export GOOGLE_ZONE=us-central1-a
```

#### Unit Tests and Linters
Run these in the provider directory (e.g., `$GOPATH/src/github.com/hashicorp/terraform-provider-google`):
```bash
make test
make lint
```

#### Acceptance Tests
Acceptance tests create real infrastructure and can take a long time. Run specific tests using `-run`:
```bash
make testacc TEST=./google/services/container TESTARGS='-run=TestAccContainerNodePool_basic$'
```

### Manual Testing with Developer Overrides

To test your locally built provider with regular `terraform` commands:

1.  Create a `~/tf-dev-override.tfrc` file:
    ```hcl
    provider_installation {
      dev_overrides {
        "hashicorp/google" = "YOUR_GO_BIN_PATH"
        "hashicorp/google-beta" = "YOUR_GO_BIN_PATH"
      }
      direct {}
    }
    ```
    Replace `YOUR_GO_BIN_PATH` with the absolute path to your `go/bin` directory.

2.  Run Terraform commands with the override file:
    ```bash
    TF_CLI_CONFIG_FILE="$HOME/tf-dev-override.tfrc" terraform plan
    TF_CLI_CONFIG_FILE="$HOME/tf-dev-override.tfrc" terraform apply
    ```

### VCR Tests
VCR tests allow replaying recorded API interactions.
- **Recording**: `VCR_MODE=RECORDING VCR_PATH=~/.vcr/ make testacc ...`
- **Replaying**: `VCR_MODE=REPLAYING VCR_PATH=~/.vcr/ make testacc ...`

---
For more details, refer to the source files in `docs/content/`.
