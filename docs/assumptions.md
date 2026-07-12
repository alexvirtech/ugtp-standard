# Assumptions

Decisions made during initial CANDIDATE standard creation that require explicit
confirmation or may be revised by subsequent Session 2A outputs.

## ID Format

- **Assumed:** UGTP protocol-level IDs use prefixed lowercase hex format:
  `uci_`, `uca_`, `int_`, `plan_`, `step_`, `exec_`, `rcpt_`, `cor_` + 32 hex chars.
- **Rationale:** The spec says "lower-case canonical textual IDs" but does not specify
  exact format. Prefixes make IDs self-describing and reduce collision risk.
- **Risk:** Session 2A may define a different ID scheme (e.g., ULID, UUID, or plain hex).

## Chain ID Type

- **Assumed:** ChainId is an integer (EIP-155 format).
- **Source:** adapter-core in ugtp-reference uses `type ChainId = number`.
- **Risk:** Low — EIP-155 is well-established standard.

## Asset ID Format

- **Assumed:** `chain_prefix:contract_address[:token_id]` format.
- **Rationale:** Need chain-qualified asset identification without custom PDL.
- **Risk:** Session 2A may define a different asset addressing scheme.

## Amount Representation

- **Assumed:** All token amounts are canonical decimal strings (no leading zeros, no decimal point).
- **Source:** Bootstrap spec says "Represent large integers and token amounts as canonical decimal strings."
- **Risk:** None — explicitly specified in requirements.

## Signature Format

- **Assumed:** Minimum 64 bytes (128 hex chars) after 0x prefix.
- **Rationale:** EVM signatures are 65 bytes; BLS signatures are longer.
- **Risk:** May need to support shorter signatures for future chain types.

## Execution Step Types

- **Assumed:** Six step types: transaction, user_operation, approval, bridge_send, bridge_receive, wait.
- **Rationale:** Covers the adapter patterns from ugtp-reference.
- **Risk:** May be incomplete for cross-chain or privacy operations.

## Intent Types

- **Assumed:** Five types: transfer, swap, bridge, approve, custom.
- **Rationale:** Covers the minimal vertical slice; custom is the escape hatch.
- **Risk:** Session 2A may define additional first-class intent types.

## Receipt Status

- **Assumed:** Four states: pending, confirmed, failed, partial.
- **Rationale:** "partial" handles multi-step executions where some steps succeed.
- **Risk:** May need additional states for cross-chain bridging edge cases.

## Event Envelope

- **Assumed:** All events share a common envelope: `{ eventType, timestamp, correlationId?, payload }`.
- **Rationale:** Consistent structure enables generic event routing and filtering.
- **Risk:** Low — standard event sourcing pattern.

## Volume 2 / Session 2A

- **Status:** Not available at time of authoring.
- **Impact:** Session 2A may add frozen definitions, change ID formats, or refine object schemas.
- **Mitigation:** All definitions marked CANDIDATE; nothing is FROZEN.

## Privacy and Communication

- **Assumed:** Private assets and communication identity are NOT included in this first CANDIDATE scope.
- **Rationale:** Bootstrap spec defines "minimal vertical slice" — privacy and communication
  are marked for later volumes.
- **Risk:** None — explicitly out of scope for 0.1.0.
