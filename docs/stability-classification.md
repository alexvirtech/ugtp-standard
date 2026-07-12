# Stability Classification

**Package:** @ugtp/standard  
**Version:** 0.1.0-candidate.1  
**Source:** Session 2A Architecture Freeze Candidate

## Stability Levels

This package uses a four-tier stability classification derived from the Session 2A
architecture freeze. Each tier defines consumption rules for implementation tracks.

| Level | Consumption Rule |
|-------|-----------------|
| **FROZEN** | May be consumed by all implementation tracks |
| **CANDIDATE_LOW** | May be consumed with normal compatibility tests |
| **CANDIDATE_MEDIUM** | May be used only behind an explicit experimental flag |
| **EXPERIMENTAL** | Must not be required by the first vertical slice |

### FROZEN

Items classified FROZEN are derived directly from existing Volume 2 requirements
(727 FR/SR/PR). They are well-established, unambiguous, and safe for immediate
consumption. No breaking changes are permitted.

All FROZEN items in this package trace to one of:
- UGTP-TYPES-001 (Protocol Type System) — primitive and identifier types
- UGTP-ARCH-001 (Protocol Object Taxonomy) — object definitions
- UGTP-FREEZE-LIFECYCLE (Protocol Lifecycle) — version constants

### CANDIDATE_LOW

Items classified CANDIDATE_LOW are architecturally sound but depend on CANDIDATE
ADRs that may be refined in Session 2B. They may be consumed with normal
compatibility tests — implementations should test against current definitions
and be prepared for non-breaking updates.

CANDIDATE_LOW items in this package:
- **ChainId type** — may migrate to CAIP-2 hybrid format (ADR-0006)
- **SUPPORTED_CHAINS constant** — chain list may expand; format may change
- **ERROR_HTTP_STATUS constant** — mappings may adjust per ADR-0019
- **ERROR_RETRYABLE constant** — retryability flags may change
- **validateChainId function** — validation rules track ChainId format

### CANDIDATE_MEDIUM

No items in this package are classified CANDIDATE_MEDIUM. This level is reserved
for definitions that depend on unvalidated architectural decisions or have high
breaking-change risk.

### EXPERIMENTAL

No items in this package are classified EXPERIMENTAL. The Session 2A freeze
identified two EXPERIMENTAL items (UCS-Enterprise profile and FEAT-ENTERPRISE
feature), but neither has schema definitions to consume.

## Breaking Change Risk

| Risk | Meaning | Items |
|------|---------|-------|
| **none** | No known path to breaking change | 63 items (all FROZEN) |
| **low** | Minor adjustments possible, backward-compatible migration | 2 items (ERROR_HTTP_STATUS, ERROR_RETRYABLE) |
| **medium** | Format or semantics may change; migration effort required | 3 items (ChainId, SUPPORTED_CHAINS, validateChainId) |
| **high** | Major revision possible; implementations should isolate | 0 items |

## Per-Definition Classification

### Types (19 definitions)

| Type | Stability | Risk | Related ADRs |
|------|-----------|------|-------------|
| ProtocolVersion | FROZEN | none | ADR-0005 |
| SchemaVersion | FROZEN | none | ADR-0008 |
| UciId | FROZEN | none | |
| UcaId | FROZEN | none | |
| AccountId | FROZEN | none | |
| ChainId | CANDIDATE_LOW | medium | ADR-0006 |
| AssetId | FROZEN | none | |
| IntentId | FROZEN | none | |
| PlanId | FROZEN | none | |
| StepId | FROZEN | none | |
| ExecutionId | FROZEN | none | |
| ReceiptId | FROZEN | none | |
| CorrelationId | FROZEN | none | |
| Timestamp | FROZEN | none | ADR-0005 |
| Amount | FROZEN | none | |
| Nonce | FROZEN | none | |
| Hash | FROZEN | none | ADR-0005 |
| Signature | FROZEN | none | ADR-0007 |
| ErrorCode | FROZEN | none | |

### Objects (10 schemas)

| Object | Stability | Risk | Related ADRs |
|--------|-----------|------|-------------|
| UCI | FROZEN | none | ADR-0001, ADR-0002 |
| UCA | FROZEN | none | |
| LinkedAccount | FROZEN | none | |
| Intent | FROZEN | none | |
| ExecutionPlan | FROZEN | none | |
| ExecutionStep | FROZEN | none | |
| UnifiedReceipt | FROZEN | none | |
| LogicalTransaction | FROZEN | none | |
| ProtocolError | FROZEN | none | |
| AdapterCapabilities | FROZEN | none | ADR-0013 |

### Messages (9 schemas)

| Message | Stability | Risk | Related ADRs |
|---------|-----------|------|-------------|
| resolve-uci | FROZEN | none | ADR-0004, ADR-0019 |
| resolve-uca | FROZEN | none | ADR-0004, ADR-0019 |
| create-intent | FROZEN | none | ADR-0004, ADR-0019 |
| estimate-intent | FROZEN | none | ADR-0004, ADR-0019 |
| submit-execution | FROZEN | none | ADR-0004, ADR-0019 |
| get-execution-status | FROZEN | none | ADR-0004, ADR-0019 |
| get-receipt | FROZEN | none | ADR-0004, ADR-0019 |
| health | FROZEN | none | ADR-0019 |
| capabilities | FROZEN | none | ADR-0019 |

### Events (11 schemas)

| Event | Stability | Risk | Related ADRs |
|-------|-----------|------|-------------|
| uci-created | FROZEN | none | ADR-0014 |
| uca-created | FROZEN | none | ADR-0014 |
| account-linked | FROZEN | none | ADR-0014 |
| intent-created | FROZEN | none | ADR-0014 |
| intent-authorized | FROZEN | none | ADR-0014 |
| execution-started | FROZEN | none | ADR-0014 |
| execution-step-updated | FROZEN | none | ADR-0014 |
| execution-completed | FROZEN | none | ADR-0014 |
| execution-failed | FROZEN | none | ADR-0014 |
| receipt-created | FROZEN | none | ADR-0014 |
| receipt-updated | FROZEN | none | ADR-0014 |

### Constants (9 definitions)

| Constant | Stability | Risk | Related ADRs |
|----------|-----------|------|-------------|
| PROTOCOL_VERSION | FROZEN | none | |
| SCHEMA_VERSION | FROZEN | none | ADR-0008 |
| ERROR_CODES | FROZEN | none | |
| ERROR_HTTP_STATUS | CANDIDATE_LOW | low | ADR-0019 |
| ERROR_RETRYABLE | CANDIDATE_LOW | low | |
| SUPPORTED_CHAINS | CANDIDATE_LOW | medium | ADR-0006 |
| INTENT_TYPES | FROZEN | none | |
| EXECUTION_STEP_TYPES | FROZEN | none | |
| EVENT_TYPES | FROZEN | none | ADR-0014 |

### Validation Functions (9 definitions)

| Function | Stability | Risk | Related ADRs |
|----------|-----------|------|-------------|
| validateId | FROZEN | none | |
| validateAmount | FROZEN | none | ADR-0005 |
| validateTimestamp | FROZEN | none | ADR-0005 |
| validateHash | FROZEN | none | |
| validateSignature | FROZEN | none | ADR-0007 |
| validateAccountId | FROZEN | none | |
| validateChainId | CANDIDATE_LOW | medium | ADR-0006 |
| validateIntent | FROZEN | none | |
| validateProtocolError | FROZEN | none | |

## Promotion Path

### CANDIDATE_LOW to FROZEN

CANDIDATE_LOW items will be promoted to FROZEN when their dependent CANDIDATE ADRs
are validated in Session 2B:

- **ADR-0006** (CAIP-2 hybrid chain IDs) validation promotes: ChainId, SUPPORTED_CHAINS, validateChainId
- **ADR-0019** (REST+GraphQL+streaming) validation promotes: ERROR_HTTP_STATUS
- General Session 2B validation promotes: ERROR_RETRYABLE

### CANDIDATE_MEDIUM to CANDIDATE_LOW

No items currently at CANDIDATE_MEDIUM. Future items added at this level will
require validation against real protocol operations before promotion.

### EXPERIMENTAL to CANDIDATE_LOW

No items currently at EXPERIMENTAL. The UCS-Enterprise profile and FEAT-ENTERPRISE
feature require dedicated specification documents before they can be consumed.

---

*Derived from UGTP-ARCH-FREEZE (Architecture Freeze Report) classification system.*
