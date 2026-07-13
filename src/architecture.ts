import type { Stability } from './constants.js'

export type StabilityLevel = 'FROZEN' | 'CANDIDATE_LOW' | 'CANDIDATE_MEDIUM' | 'EXPERIMENTAL'

export type BreakingChangeRisk = 'none' | 'low' | 'medium' | 'high'

export interface ArchitectureMetadata {
  readonly architectureSource: string
  readonly architectureClassification: Stability
  readonly stabilityLevel: StabilityLevel
  readonly breakingChangeRisk: BreakingChangeRisk
  readonly relatedADR: readonly string[]
  readonly relatedCapability: readonly string[]
  readonly relatedProfile: readonly string[]
  readonly relatedFeature: readonly string[]
}

export const STABILITY_LEVELS = {
  FROZEN: 'FROZEN',
  CANDIDATE_LOW: 'CANDIDATE_LOW',
  CANDIDATE_MEDIUM: 'CANDIDATE_MEDIUM',
  EXPERIMENTAL: 'EXPERIMENTAL',
} as const

export const STABILITY_RULES = {
  FROZEN: 'May be consumed by all implementation tracks',
  CANDIDATE_LOW: 'May be consumed with normal compatibility tests',
  CANDIDATE_MEDIUM: 'May be used only behind an explicit experimental flag',
  EXPERIMENTAL: 'Must not be required by the first vertical slice',
} as const

function meta(
  source: string,
  classification: Stability,
  stability: StabilityLevel,
  risk: BreakingChangeRisk,
  adrs: readonly string[],
  capabilities: readonly string[],
  profiles: readonly string[],
  features: readonly string[],
): ArchitectureMetadata {
  return {
    architectureSource: source,
    architectureClassification: classification,
    stabilityLevel: stability,
    breakingChangeRisk: risk,
    relatedADR: adrs,
    relatedCapability: capabilities,
    relatedProfile: profiles,
    relatedFeature: features,
  }
}

// --- Scalar types ---

export const TYPE_METADATA: Record<string, ArchitectureMetadata> = {
  ProtocolVersion: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0005'], [], ['ugtp:profile:core'], [],
  ),
  SchemaVersion: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0008'], [], ['ugtp:profile:core'], [],
  ),
  UciId: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], ['ugtp:capability:identity:create'], ['ugtp:profile:core'], [],
  ),
  UcaId: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], ['ugtp:capability:identity:create'], ['ugtp:profile:core'], [],
  ),
  AccountId: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
  ChainId: meta(
    'UGTP-TYPES-001', 'CANDIDATE', 'CANDIDATE_LOW', 'medium',
    ['ADR-0006'], [], ['ugtp:profile:core'], [],
  ),
  AssetId: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
  IntentId: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], ['ugtp:capability:execution:submit'], ['ugtp:profile:core'], [],
  ),
  PlanId: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], ['ugtp:capability:execution:plan'], ['ugtp:profile:core'], [],
  ),
  StepId: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
  ExecutionId: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], ['ugtp:capability:execution:submit'], ['ugtp:profile:core'], [],
  ),
  ReceiptId: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
  CorrelationId: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
  Timestamp: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0005'], [], ['ugtp:profile:core'], [],
  ),
  Amount: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
  Nonce: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
  Hash: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0005'], [], ['ugtp:profile:core'], [],
  ),
  Signature: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0007'], [], ['ugtp:profile:core'], [],
  ),
  ErrorCode: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
}

// --- Object schemas ---

export const OBJECT_METADATA: Record<string, ArchitectureMetadata> = {
  UCI: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0001', 'ADR-0002'], ['ugtp:capability:identity:create', 'ugtp:capability:identity:manage'],
    ['ugtp:profile:core'], ['FEAT-RECOVERY'],
  ),
  UCA: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    [], ['ugtp:capability:identity:create', 'ugtp:capability:identity:manage'],
    ['ugtp:profile:core'], [],
  ),
  LinkedAccount: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    [], ['ugtp:capability:identity:link'],
    ['ugtp:profile:core'], [],
  ),
  Intent: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    [], ['ugtp:capability:execution:submit', 'ugtp:capability:execution:cancel'],
    ['ugtp:profile:core'], [],
  ),
  ExecutionStep: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    [], ['ugtp:capability:execution:submit'],
    ['ugtp:profile:core'], [],
  ),
  ExecutionPlan: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    [], ['ugtp:capability:execution:plan'],
    ['ugtp:profile:core'], [],
  ),
  UnifiedReceipt: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    [], [],
    ['ugtp:profile:core'], [],
  ),
  LogicalTransaction: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    [], ['ugtp:capability:explorer:query'],
    ['ugtp:profile:core'], ['FEAT-EXPLORER'],
  ),
  ProtocolError: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    [], [],
    ['ugtp:profile:core'], [],
  ),
  AdapterCapabilities: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0013'], [],
    ['ugtp:profile:core', 'ugtp:profile:evm'], ['FEAT-SMART'],
  ),
}

// --- Message schemas ---

export const MESSAGE_METADATA: Record<string, ArchitectureMetadata> = {
  'resolve-uci': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0004', 'ADR-0019'], ['ugtp:capability:identity:resolve'],
    ['ugtp:profile:core'], [],
  ),
  'resolve-uca': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0004', 'ADR-0019'], ['ugtp:capability:identity:resolve'],
    ['ugtp:profile:core'], [],
  ),
  'create-intent': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0004', 'ADR-0019'], ['ugtp:capability:execution:submit'],
    ['ugtp:profile:core'], [],
  ),
  'estimate-intent': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0004', 'ADR-0019'], ['ugtp:capability:execution:plan'],
    ['ugtp:profile:core'], ['FEAT-GAS'],
  ),
  'submit-execution': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0004', 'ADR-0019'], ['ugtp:capability:execution:submit'],
    ['ugtp:profile:core'], [],
  ),
  'get-execution-status': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0004', 'ADR-0019'], ['ugtp:capability:execution:query'],
    ['ugtp:profile:core'], [],
  ),
  'get-receipt': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0004', 'ADR-0019'], [],
    ['ugtp:profile:core'], [],
  ),
  health: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0019'], [],
    ['ugtp:profile:core'], [],
  ),
  capabilities: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0019'], [],
    ['ugtp:profile:core'], [],
  ),
}

// --- Event schemas ---

export const EVENT_METADATA: Record<string, ArchitectureMetadata> = {
  'uci-created': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0014'], [],
    ['ugtp:profile:core'], [],
  ),
  'uca-created': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0014'], [],
    ['ugtp:profile:core'], [],
  ),
  'account-linked': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0014'], ['ugtp:capability:identity:link'],
    ['ugtp:profile:core'], [],
  ),
  'intent-created': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0014'], ['ugtp:capability:execution:submit'],
    ['ugtp:profile:core'], [],
  ),
  'intent-authorized': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0014'], [],
    ['ugtp:profile:core'], [],
  ),
  'execution-started': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0014'], [],
    ['ugtp:profile:core'], [],
  ),
  'execution-step-updated': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0014'], [],
    ['ugtp:profile:core'], [],
  ),
  'execution-completed': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0014'], [],
    ['ugtp:profile:core'], [],
  ),
  'execution-failed': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0014'], [],
    ['ugtp:profile:core'], [],
  ),
  'receipt-created': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0014'], [],
    ['ugtp:profile:core'], [],
  ),
  'receipt-updated': meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0014'], [],
    ['ugtp:profile:core'], [],
  ),
}

// --- Constants metadata ---

export const CONSTANT_METADATA: Record<string, ArchitectureMetadata> = {
  PROTOCOL_VERSION: meta(
    'UGTP-FREEZE-LIFECYCLE', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
  SCHEMA_VERSION: meta(
    'UGTP-FREEZE-LIFECYCLE', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0008'], [], ['ugtp:profile:core'], [],
  ),
  ERROR_CODES: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
  ERROR_HTTP_STATUS: meta(
    'UGTP-ARCH-001', 'CANDIDATE', 'CANDIDATE_LOW', 'low',
    ['ADR-0019'], [], ['ugtp:profile:core'], [],
  ),
  ERROR_RETRYABLE: meta(
    'UGTP-ARCH-001', 'CANDIDATE', 'CANDIDATE_LOW', 'low',
    [], [], ['ugtp:profile:core'], [],
  ),
  SUPPORTED_CHAINS: meta(
    'UGTP-TYPES-001', 'CANDIDATE', 'CANDIDATE_LOW', 'medium',
    ['ADR-0006'], [], ['ugtp:profile:core', 'ugtp:profile:evm'], [],
  ),
  INTENT_TYPES: meta(
    'UCS-1-04-007', 'FROZEN', 'FROZEN', 'none',
    [], ['ugtp:capability:execution:submit'], ['ugtp:profile:core'], [],
  ),
  'IntentType:custom': meta(
    'UCS-1-04-007', 'EXPERIMENTAL', 'EXPERIMENTAL', 'high',
    [], ['ugtp:capability:execution:submit'], ['ugtp:profile:core'], [],
  ),
  EXECUTION_STEP_TYPES: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
  EVENT_TYPES: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0014'], [], ['ugtp:profile:core'], [],
  ),
}

// --- Validation function metadata ---

export const VALIDATION_METADATA: Record<string, ArchitectureMetadata> = {
  validateId: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
  validateAmount: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0005'], [], ['ugtp:profile:core'], [],
  ),
  validateTimestamp: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0005'], [], ['ugtp:profile:core'], [],
  ),
  validateHash: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
  validateSignature: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    ['ADR-0007'], [], ['ugtp:profile:core'], [],
  ),
  validateAccountId: meta(
    'UGTP-TYPES-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
  validateChainId: meta(
    'UGTP-TYPES-001', 'CANDIDATE', 'CANDIDATE_LOW', 'medium',
    ['ADR-0006'], [], ['ugtp:profile:core'], [],
  ),
  validateIntent: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    [], ['ugtp:capability:execution:submit'], ['ugtp:profile:core'], [],
  ),
  validateProtocolError: meta(
    'UGTP-ARCH-001', 'FROZEN', 'FROZEN', 'none',
    [], [], ['ugtp:profile:core'], [],
  ),
}

export function getDefinitionMetadata(category: string, name: string): ArchitectureMetadata | undefined {
  switch (category) {
    case 'type': return TYPE_METADATA[name]
    case 'object': return OBJECT_METADATA[name]
    case 'message': return MESSAGE_METADATA[name]
    case 'event': return EVENT_METADATA[name]
    case 'constant': return CONSTANT_METADATA[name]
    case 'validation': return VALIDATION_METADATA[name]
    default: return undefined
  }
}

export function getAllMetadata(): Record<string, Record<string, ArchitectureMetadata>> {
  return {
    type: TYPE_METADATA,
    object: OBJECT_METADATA,
    message: MESSAGE_METADATA,
    event: EVENT_METADATA,
    constant: CONSTANT_METADATA,
    validation: VALIDATION_METADATA,
  }
}
