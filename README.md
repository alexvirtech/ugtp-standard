# @ugtp/standard

Machine-readable canonical definitions for the Universal Gateway Transaction Protocol.

**Status:** CANDIDATE  
**Version:** 0.1.0-candidate.1

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
```

## Exports

| Path | Contents |
|------|----------|
| `@ugtp/standard` | Generated TypeScript types |
| `@ugtp/standard/constants` | Protocol constants and error codes |
| `@ugtp/standard/validation` | Schema validation helpers |
| `@ugtp/standard/schemas/json/*` | Raw JSON Schema files |
| `@ugtp/standard/schemas/openapi` | OpenAPI 3.1 specification |
| `@ugtp/standard/schemas/asyncapi` | AsyncAPI 3.0 specification |

## Development

```bash
pnpm install
pnpm build       # Generate types from schemas + compile
pnpm test        # Run conformance tests
pnpm validate    # Validate all schemas
pnpm check       # validate + build + test
```

## Architecture

```
schemas/json/     ← Source of truth (JSON Schema Draft 2020-12)
schemas/openapi/  ← OpenAPI 3.1 API definition
schemas/asyncapi/ ← AsyncAPI 3.0 event definition
src/              ← Generated TypeScript + hand-written validation/constants
tools/            ← Code generation and validation scripts
fixtures/         ← Valid and invalid test vectors
conformance/      ← Conformance test suite
```

## Stability Markers

Every definition carries one of:

- **FROZEN** — no breaking changes permitted
- **CANDIDATE** — reviewed and believed stable, may change with RFC
- **EXPERIMENTAL** — subject to change without notice

All definitions in this initial release are CANDIDATE unless explicitly frozen.

## License

MIT — Norionsoft
