# @ugtp/standard

Machine-readable canonical definitions for the Universal Gateway Transaction Protocol.

**Status:** Synchronized with Session 2A Architecture Freeze  
**Version:** 0.1.0-candidate.1  
**Stability:** 63 FROZEN / 5 CANDIDATE_LOW / 0 EXPERIMENTAL

## What This Is

This package is the single source of truth for UGTP protocol types, message schemas,
event definitions, error codes, and API specifications. It is consumed by all UGTP
implementations to ensure interoperability.

This is **not** prose documentation (see ugtp-specification) and **not** an implementation
(see ugtp-reference).

## Install

```bash
pnpm add @ugtp/standard
```

## Usage

```typescript
import { UciId, Intent, ProtocolError } from '@ugtp/standard'
import { ERROR_CODES, PROTOCOL_VERSION } from '@ugtp/standard/constants'
import { validateIntent } from '@ugtp/standard/validation'
import { getDefinitionMetadata, STABILITY_RULES } from '@ugtp/standard/architecture'

// Check stability before consuming a definition
const meta = getDefinitionMetadata('type', 'ChainId')
if (meta?.stabilityLevel === 'FROZEN') {
  // Safe to consume without restrictions
}
```

## Exports

| Path | Contents |
|------|----------|
| `@ugtp/standard` | TypeScript types + constants + validation + architecture metadata |
| `@ugtp/standard/types` | TypeScript types only |
| `@ugtp/standard/constants` | Protocol constants and error codes |
| `@ugtp/standard/validation` | Schema validation helpers |
| `@ugtp/standard/architecture` | Architecture metadata and lookup functions |
| `@ugtp/standard/schemas/json/*` | Raw JSON Schema files (with x-ugtp-architecture) |
| `@ugtp/standard/schemas/openapi` | OpenAPI 3.1 specification |
| `@ugtp/standard/schemas/asyncapi` | AsyncAPI 3.0 specification |

## Development

```bash
pnpm install
pnpm build       # Compile TypeScript
pnpm test        # Run conformance tests
pnpm validate    # Validate all schemas
pnpm check       # validate + build + test
```

## Architecture

```
schemas/json/       <- Source of truth (JSON Schema Draft 2020-12 + x-ugtp-architecture)
schemas/openapi/    <- OpenAPI 3.1 API definition
schemas/asyncapi/   <- AsyncAPI 3.0 event definition
src/                <- TypeScript types, constants, validation, architecture metadata
compatibility/      <- Per-version compatibility declarations
docs/               <- Architecture sync report, stability classification, matrices
tools/              <- Validation scripts
fixtures/           <- Valid and invalid test vectors
conformance/        <- Conformance test suite
```

## Stability Levels

Every definition carries a four-tier stability classification:

| Level | Rule |
|-------|------|
| **FROZEN** | May be consumed by all implementation tracks |
| **CANDIDATE_LOW** | May be consumed with normal compatibility tests |
| **CANDIDATE_MEDIUM** | May be used only behind an explicit experimental flag |
| **EXPERIMENTAL** | Must not be required by the first vertical slice |

See [docs/stability-classification.md](docs/stability-classification.md) for the
complete per-definition classification.

## Architecture Metadata

Every definition records:
- Architecture source document
- Architecture classification (FROZEN / CANDIDATE / EXPERIMENTAL)
- Stability level (FROZEN / CANDIDATE_LOW / CANDIDATE_MEDIUM / EXPERIMENTAL)
- Breaking-change risk (none / low / medium / high)
- Related ADRs
- Related capabilities
- Related profiles
- Related features

Access programmatically via `@ugtp/standard/architecture` or read `x-ugtp-architecture`
extensions in JSON Schema files.

## License

MIT -- Norionsoft
