# Demo 1 Standard Baseline

**Version:** 0.1.0-candidate.1
**Branch:** integration/standard-v0.1
**Date:** 2026-07-12

## Summary

This document records the @ugtp/standard baseline used for Demo 1 (Avalanche C-Chain Mainnet).

The standard-core track (`track/standard-core`) has been merged into `integration/standard-v0.1` at this point. All conformance tests, schema validations, and build steps pass.

## Contents

- **68 definitions** across 6 categories
- **63 FROZEN**, 5 CANDIDATE_LOW
- 19 types, 10 objects, 9 messages, 11 events, 9 constants, 9 validation functions
- 29 JSON Schema (Draft 2020-12) files
- 1 OpenAPI 3.1 specification (10 REST paths)
- 1 AsyncAPI 3.0 specification (13 event channels)

## Validation Results

| Check | Result |
|-------|--------|
| JSON Schema validation | PASS (31 schemas) |
| OpenAPI 3.1 validation | PASS |
| AsyncAPI 3.0 validation | PASS |
| TypeScript build | PASS |
| Conformance tests | PASS (71/71) |

## CANDIDATE_LOW Items

These 5 definitions may change in future candidates:

1. `ChainId` type — may migrate to CAIP-2
2. `SUPPORTED_CHAINS` constant — chain list may expand
3. `ERROR_HTTP_STATUS` constant — mapping may adjust
4. `ERROR_RETRYABLE` constant — retry set may adjust
5. `validateChainId` function — depends on ChainId changes

## Merge History

```
954320a merge: track/standard-core into integration/standard-v0.1
2bfa5b3 track: add .gitignore with secret exclusion patterns
2828551 1
1ae66cc feat: synchronize with Session 2A architecture freeze
a1cac93 feat: initial CANDIDATE standard
```

## Next Steps

- SDK must depend on this package (not bundled copy)
- All tracks must import types from @ugtp/standard
- Do not merge to main until Demo 1 acceptance
