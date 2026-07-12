# Component Compatibility Matrix

**Package:** @ugtp/standard  
**Version:** 0.1.0-candidate.1  
**Source:** Session 2A Architecture Freeze Candidate

## Profile Compatibility

All profiles are pairwise compatible. An implementation MAY support any combination.
Each non-Core profile independently extends UCS-Core without conflict.

| | UCS-Core | UCS-EVM | UCS-Private | UCS-Communication | UCS-Enterprise |
|---|---|---|---|---|---|
| **UCS-Core** | -- | Compatible | Compatible | Compatible | Compatible |
| **UCS-EVM** | Requires | -- | Compatible | Compatible | Compatible |
| **UCS-Private** | Requires | Compatible | -- | Compatible | Compatible |
| **UCS-Communication** | Requires | Compatible | Compatible | -- | Compatible |
| **UCS-Enterprise** | Requires | Compatible | Compatible | Compatible | -- |

## Feature Compatibility

Features do not depend on each other directly. All depend on UCS-Core through
their required profile.

| Feature | Required Profile | Compliance Levels | Stability |
|---------|-----------------|-------------------|-----------|
| FEAT-RECOVERY | UCS-Core | A, B, C, D | FROZEN |
| FEAT-GAS | UCS-Core | A, B, C, D | FROZEN |
| FEAT-EXPLORER | UCS-Core | B, D | FROZEN |
| FEAT-SMART | UCS-EVM | B, C, D | FROZEN |
| FEAT-COMM | UCS-Communication | C, D | FROZEN |
| FEAT-PRIV | UCS-Private | D | CANDIDATE |
| FEAT-ENTERPRISE | UCS-Enterprise | D | EXPERIMENTAL |

## Feature Interaction Matrix

When multiple features are active, these interactions apply:

| Feature A | Feature B | Interaction |
|-----------|-----------|------------|
| FEAT-PRIV | FEAT-SMART | Private assets on EVM chains use smart account adapters |
| FEAT-PRIV | FEAT-ENTERPRISE | Enterprise audit may require selective disclosure |
| FEAT-PRIV | FEAT-EXPLORER | Explorer MUST NOT display private asset details |
| FEAT-COMM | FEAT-ENTERPRISE | Enterprise audit may log communication metadata |
| FEAT-SMART | FEAT-GAS | Smart accounts use ERC-4337 paymaster integration |
| FEAT-SMART | FEAT-EXPLORER | Explorer displays smart account operations |
| FEAT-RECOVERY | FEAT-SMART | Recovery triggers smart account re-verification |
| FEAT-RECOVERY | FEAT-COMM | Recovery invalidates communication sessions |
| FEAT-GAS | FEAT-EXPLORER | Explorer displays fee summary with sponsorship |
| FEAT-ENTERPRISE | FEAT-EXPLORER | Audit entries queryable through explorer |

## Object-to-Profile Mapping

### UCS-Core Objects (in this package)

| Object | Category | Schema | Stability |
|--------|----------|--------|-----------|
| UCI | Identity | uci.json | FROZEN |
| UCA | Identity | uca.json | FROZEN |
| LinkedAccount | Identity | linked-account.json | FROZEN |
| Intent | Execution | intent.json | FROZEN |
| ExecutionPlan | Execution | execution-plan.json | FROZEN |
| ExecutionStep | Execution | execution-step.json | FROZEN |
| UnifiedReceipt | Execution | unified-receipt.json | FROZEN |
| LogicalTransaction | Execution | logical-transaction.json | FROZEN |
| ProtocolError | Infrastructure | protocol-error.json | FROZEN |
| AdapterCapabilities | Infrastructure | adapter-capabilities.json | FROZEN |

### Objects Requiring Additional Profiles (not in this package)

| Object | Profile | Category | Status |
|--------|---------|----------|--------|
| SmartAccount | UCS-EVM | Identity | FROZEN (no schema) |
| CommunicationIdentity | UCS-Communication | Identity | FROZEN (no schema) |
| Channel | UCS-Communication | Communication | FROZEN (no schema) |
| Message | UCS-Communication | Communication | FROZEN (no schema) |
| KeyAgreement | UCS-Communication | Communication | FROZEN (no schema) |
| Group | UCS-Communication | Communication | FROZEN (no schema) |
| AuditEntry | UCS-Enterprise | Infrastructure | EXPERIMENTAL |
| ApprovalWorkflow | UCS-Enterprise | Authority | EXPERIMENTAL |
| CompliancePolicy | UCS-Enterprise | Authority | EXPERIMENTAL |

## Compliance Level Mapping

| Level | Name | Profiles | Features Required | Status |
|-------|------|----------|-------------------|--------|
| A | Core | UCS-Core | FEAT-RECOVERY, FEAT-GAS | FROZEN |
| B | Core+Explorer | UCS-Core | Level A + FEAT-EXPLORER, FEAT-SMART | FROZEN |
| C | Core+Communication | UCS-Core, UCS-Communication | Level A + FEAT-COMM | FROZEN |
| D | Full | All | All features | CANDIDATE |

## ADR Compatibility Impact

| ADR | Status | Breaking if Changed | Affected Components |
|-----|--------|-------------------|---------------------|
| ADR-0001 | FROZEN | N/A (frozen) | UCI, glossary terms |
| ADR-0002 | FROZEN | N/A (frozen) | UCI, axiom-derived constraints |
| ADR-0004 | CANDIDATE | High | All message schemas |
| ADR-0005 | FROZEN | N/A (frozen) | Serialization, timestamps, hashes |
| ADR-0006 | CANDIDATE | Medium | ChainId type, chain identifiers |
| ADR-0007 | CANDIDATE | Medium | Signature type, domain separators |
| ADR-0008 | FROZEN | N/A (frozen) | All JSON Schemas |
| ADR-0013 | FROZEN | N/A (frozen) | AdapterCapabilities |
| ADR-0014 | CANDIDATE | Low | Event schemas (additive CloudEvents) |
| ADR-0019 | CANDIDATE | Medium | REST API message schemas |

---

*Derived from UGTP-ARCH-003 (Profile Model), UGTP-ARCH-005 (Feature Model),
UGTP-ARCH-006 (Compliance Levels), and UGTP-ARCH-001 (Object Taxonomy).*
