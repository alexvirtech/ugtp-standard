# Architecture Synchronization Report

**Package:** @ugtp/standard  
**Version:** 0.1.0-candidate.1  
**Synchronized with:** Session 2A Architecture Freeze Candidate (2026-07-12)  
**Specification repository:** ugtp-specification

## Overview

This report documents the synchronization of `@ugtp/standard` with the Session 2A
Architecture Freeze Candidate produced in `ugtp-specification`. Every definition in
this package now records its architecture source, classification, stability level,
breaking-change risk, and related ADRs, capabilities, profiles, and features.

## Architecture Source

All definitions in this package are derived from the following architecture documents:

| Document ID | Title | Items Consumed |
|-------------|-------|---------------|
| UGTP-TYPES-001 | Protocol Type System | 19 scalar types, validation rules |
| UGTP-ARCH-001 | Protocol Object Taxonomy | 10 object schemas, cross-category relationships |
| UGTP-ARCH-003 | Protocol Profile Model | Profile mappings for all definitions |
| UGTP-ARCH-005 | Protocol Feature Model | Feature mappings for applicable definitions |
| UGTP-ARCH-006 | Protocol Compliance Levels | Compliance level mappings |
| UGTP-FREEZE-LIFECYCLE | Protocol Lifecycle | Version constants |

## Classification Summary

### By Stability Level

| Stability Level | Count | Rule |
|----------------|-------|------|
| FROZEN | 63 | May be consumed by all implementation tracks |
| CANDIDATE_LOW | 5 | May be consumed with normal compatibility tests |
| CANDIDATE_MEDIUM | 0 | May be used only behind an explicit experimental flag |
| EXPERIMENTAL | 0 | Must not be required by the first vertical slice |

### By Category

| Category | Total | FROZEN | CANDIDATE_LOW | CANDIDATE_MEDIUM | EXPERIMENTAL |
|----------|-------|--------|---------------|------------------|-------------|
| Types | 19 | 18 | 1 | 0 | 0 |
| Objects | 10 | 10 | 0 | 0 | 0 |
| Messages | 9 | 9 | 0 | 0 | 0 |
| Events | 11 | 11 | 0 | 0 | 0 |
| Constants | 9 | 6 | 3 | 0 | 0 |
| Validation | 9 | 8 | 1 | 0 | 0 |

### CANDIDATE_LOW Items

These items may be consumed with normal compatibility tests:

| Definition | Category | Risk | Rationale |
|-----------|----------|------|-----------|
| ChainId | Type | medium | ADR-0006 may migrate to CAIP-2 hybrid identifiers |
| ERROR_HTTP_STATUS | Constant | low | HTTP status mappings may change per ADR-0019 |
| ERROR_RETRYABLE | Constant | low | Retryability flags may change |
| SUPPORTED_CHAINS | Constant | medium | Chain list will expand; format may change per ADR-0006 |
| validateChainId | Validation | medium | Validation rules will change if ChainId format changes |

## ADR Coverage

The following ADRs are referenced by definitions in this package:

| ADR | Status | Definitions Affected |
|-----|--------|---------------------|
| ADR-0001 | FROZEN | UCI (glossary alignment) |
| ADR-0002 | FROZEN | UCI (axiom system) |
| ADR-0004 | CANDIDATE | All message schemas (envelope format) |
| ADR-0005 | FROZEN | ProtocolVersion, Timestamp, Hash, Amount (canonical JSON) |
| ADR-0006 | CANDIDATE | ChainId, SUPPORTED_CHAINS, validateChainId (CAIP-2 hybrid) |
| ADR-0007 | CANDIDATE | Signature (domain separators) |
| ADR-0008 | FROZEN | SchemaVersion (JSON Schema as PDL) |
| ADR-0013 | FROZEN | AdapterCapabilities (thin adapter layer) |
| ADR-0014 | CANDIDATE | All event schemas (CloudEvents compatibility) |
| ADR-0019 | CANDIDATE | All message schemas, ERROR_HTTP_STATUS (API patterns) |

## Profile Coverage

| Profile | Definitions |
|---------|-------------|
| ugtp:profile:core | All 68 definitions |
| ugtp:profile:evm | AdapterCapabilities, SUPPORTED_CHAINS |

## Feature Coverage

| Feature | Status | Definitions |
|---------|--------|-------------|
| FEAT-RECOVERY | FROZEN | UCI |
| FEAT-EXPLORER | FROZEN | LogicalTransaction |
| FEAT-GAS | FROZEN | estimate-intent message |
| FEAT-SMART | FROZEN | AdapterCapabilities |

## Items Not Consumed

The following Session 2A items are NOT consumed by this package because they lack
JSON Schemas (GAP-0009) or are EXPERIMENTAL:

### Missing Schemas (FROZEN objects without JSON Schema)

- SmartAccount (Identity) — requires UCS-EVM profile
- Credential (Identity) — embedded in UCI schema
- Guardian (Identity) — embedded in recovery schema
- ExecutionAdapter (Execution) — no standalone schema
- GasPayment (Execution) — no standalone schema
- Sponsorship (Execution) — no standalone schema
- Channel (Communication) — requires UCS-Communication profile
- Message (Communication) — requires UCS-Communication profile
- KeyAgreement (Communication) — requires UCS-Communication profile
- Group (Communication) — requires UCS-Communication profile
- Version (Infrastructure) — no standalone schema
- RegistryEntry (Infrastructure) — abstract interface (ADR-0016)
- ExplorerRecord (Infrastructure) — no standalone schema

### CANDIDATE Objects (not yet validated)

- Capability (Authority) — ADR-0003 formalization pending
- Permission (Authority) — embedded as enum
- Quote (Execution) — ADR-0018, new object

### EXPERIMENTAL Items (not consumed)

- UCS-Enterprise profile
- FEAT-ENTERPRISE feature

## Synchronization Metadata

Architecture metadata is recorded in two places:

1. **JSON Schemas:** Each schema carries an `x-ugtp-architecture` extension object
   with source, classification, stabilityLevel, breakingChangeRisk, and related
   ADRs/capabilities/profiles/features.

2. **TypeScript exports:** The `architecture.ts` module exports metadata records
   for every definition category (TYPE_METADATA, OBJECT_METADATA, MESSAGE_METADATA,
   EVENT_METADATA, CONSTANT_METADATA, VALIDATION_METADATA) plus lookup functions
   (getDefinitionMetadata, getAllMetadata).

Both representations contain identical data. The TypeScript metadata is the
programmatic interface; the JSON Schema extensions are the machine-readable
annotation at the schema level.

---

*Generated from Session 2A Architecture Freeze Candidate (UGTP-ARCH-FREEZE).*
