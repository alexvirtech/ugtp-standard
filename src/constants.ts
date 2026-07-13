export const PROTOCOL_VERSION = '0.1.0' as const

export const SCHEMA_VERSION = '0.1.0' as const

export const STABILITY = {
  FROZEN: 'FROZEN',
  CANDIDATE: 'CANDIDATE',
  EXPERIMENTAL: 'EXPERIMENTAL',
} as const

export type Stability = typeof STABILITY[keyof typeof STABILITY]

export const STABILITY_LEVELS = {
  FROZEN: 'FROZEN',
  CANDIDATE_LOW: 'CANDIDATE_LOW',
  CANDIDATE_MEDIUM: 'CANDIDATE_MEDIUM',
  EXPERIMENTAL: 'EXPERIMENTAL',
} as const

export type StabilityLevel = typeof STABILITY_LEVELS[keyof typeof STABILITY_LEVELS]

export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_REQUIRED: 'AUTHENTICATION_REQUIRED',
  AUTHORIZATION_DENIED: 'AUTHORIZATION_DENIED',
  POLICY_DENIED: 'POLICY_DENIED',
  VERSION_UNSUPPORTED: 'VERSION_UNSUPPORTED',
  CHAIN_UNSUPPORTED: 'CHAIN_UNSUPPORTED',
  ADAPTER_UNAVAILABLE: 'ADAPTER_UNAVAILABLE',
  SIMULATION_FAILED: 'SIMULATION_FAILED',
  EXECUTION_FAILED: 'EXECUTION_FAILED',
  RECEIPT_NOT_FOUND: 'RECEIPT_NOT_FOUND',
  TEMPORARILY_UNAVAILABLE: 'TEMPORARILY_UNAVAILABLE',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES]

export const ERROR_HTTP_STATUS: Record<ErrorCode, number> = {
  VALIDATION_ERROR: 400,
  AUTHENTICATION_REQUIRED: 401,
  AUTHORIZATION_DENIED: 403,
  POLICY_DENIED: 403,
  VERSION_UNSUPPORTED: 400,
  CHAIN_UNSUPPORTED: 400,
  ADAPTER_UNAVAILABLE: 503,
  SIMULATION_FAILED: 422,
  EXECUTION_FAILED: 500,
  RECEIPT_NOT_FOUND: 404,
  TEMPORARILY_UNAVAILABLE: 503,
  INTERNAL_ERROR: 500,
}

export const ERROR_RETRYABLE: Record<ErrorCode, boolean> = {
  VALIDATION_ERROR: false,
  AUTHENTICATION_REQUIRED: false,
  AUTHORIZATION_DENIED: false,
  POLICY_DENIED: false,
  VERSION_UNSUPPORTED: false,
  CHAIN_UNSUPPORTED: false,
  ADAPTER_UNAVAILABLE: true,
  SIMULATION_FAILED: false,
  EXECUTION_FAILED: false,
  RECEIPT_NOT_FOUND: false,
  TEMPORARILY_UNAVAILABLE: true,
  INTERNAL_ERROR: false,
}

export const SUPPORTED_CHAINS = {
  ETHEREUM: 1,
  POLYGON: 137,
  BASE: 8453,
  AVALANCHE_CCHAIN: 43114,
  ARBITRUM: 42161,
} as const

export type SupportedChainId = typeof SUPPORTED_CHAINS[keyof typeof SUPPORTED_CHAINS]

// UCS-1 canonical set (7 types) + 'custom' (EXPERIMENTAL escape hatch)
export const INTENT_TYPES = ['transfer', 'swap', 'approve', 'deploy', 'call', 'batch', 'cross-chain-transfer', 'custom'] as const
export type IntentType = typeof INTENT_TYPES[number]

export const EXECUTION_STEP_TYPES = ['transaction', 'user_operation', 'approval', 'bridge_send', 'bridge_receive', 'wait'] as const
export type ExecutionStepType = typeof EXECUTION_STEP_TYPES[number]

export const EVENT_TYPES = [
  'uci.created',
  'uca.created',
  'account.linked',
  'intent.created',
  'intent.authorized',
  'execution.started',
  'execution.step.updated',
  'execution.completed',
  'execution.failed',
  'receipt.created',
  'receipt.updated',
] as const
export type EventType = typeof EVENT_TYPES[number]
