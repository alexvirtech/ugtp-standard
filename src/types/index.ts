export type ProtocolVersion = `${number}.${number}.${number}`
export type SchemaVersion = `${number}.${number}.${number}`

export type UciId = `uci_${string}`
export type UcaId = `uca_${string}`
export type AccountId = `0x${string}`
export type ChainId = number
export type AssetId = string
export type IntentId = `int_${string}`
export type PlanId = `plan_${string}`
export type StepId = `step_${string}`
export type ExecutionId = `exec_${string}`
export type ReceiptId = `rcpt_${string}`
export type CorrelationId = `cor_${string}`
export type Timestamp = string
export type Amount = string
export type Nonce = string
export type Hash = `0x${string}`
export type Signature = `0x${string}`

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_REQUIRED'
  | 'AUTHORIZATION_DENIED'
  | 'POLICY_DENIED'
  | 'VERSION_UNSUPPORTED'
  | 'CHAIN_UNSUPPORTED'
  | 'ADAPTER_UNAVAILABLE'
  | 'SIMULATION_FAILED'
  | 'EXECUTION_FAILED'
  | 'RECEIPT_NOT_FOUND'
  | 'TEMPORARILY_UNAVAILABLE'
  | 'INTERNAL_ERROR'

export type UciStatus = 'active' | 'suspended' | 'recovering'
export type AccountType = 'eoa' | 'smart_account' | 'multisig'
export type IntentType = 'transfer' | 'swap' | 'bridge' | 'approve' | 'custom'
export type IntentStatus = 'created' | 'authorized' | 'executing' | 'completed' | 'failed' | 'cancelled'
export type ExecutionStepType = 'transaction' | 'user_operation' | 'approval' | 'bridge_send' | 'bridge_receive' | 'wait'
export type StepStatus = 'pending' | 'submitted' | 'confirmed' | 'failed' | 'skipped'
export type ReceiptStatus = 'pending' | 'confirmed' | 'failed' | 'partial'
export type HealthStatus = 'healthy' | 'degraded' | 'unhealthy'

export interface UCI {
  uciId: UciId
  createdAt: Timestamp
  updatedAt?: Timestamp
  status: UciStatus
  recoveryHash?: Hash
}

export interface LinkedAccount {
  chainId: ChainId
  address: AccountId
  accountType: AccountType
  linkedAt: Timestamp
  verificationHash?: Hash
}

export interface UCA {
  ucaId: UcaId
  uciId: UciId
  label: string
  linkedAccounts: LinkedAccount[]
  createdAt: Timestamp
  updatedAt?: Timestamp
}

export interface IntentParams {
  fromChainId?: ChainId
  toChainId?: ChainId
  fromAsset?: AssetId
  toAsset?: AssetId
  amount?: Amount
  recipient?: AccountId
  data?: `0x${string}`
  [key: string]: unknown
}

export interface Intent {
  intentId: IntentId
  ucaId: UcaId
  type: IntentType
  params: IntentParams
  status: IntentStatus
  expiresAt?: Timestamp
  nonce?: Nonce
  signature?: Signature
  createdAt: Timestamp
  updatedAt?: Timestamp
}

export interface ExecutionStep {
  stepId: StepId
  chainId: ChainId
  type: ExecutionStepType
  order: number
  status: StepStatus
  transactionHash?: Hash
  userOperationHash?: Hash
  target?: AccountId
  value?: Amount
  data?: `0x${string}`
  gasUsed?: Amount
  feePaid?: Amount
  error?: string
  startedAt?: Timestamp
  completedAt?: Timestamp
}

export interface ExecutionPlan {
  planId: PlanId
  intentId: IntentId
  version: number
  steps: ExecutionStep[]
  estimatedFee?: Amount
  estimatedDuration?: number
  validUntil?: Timestamp
  createdAt: Timestamp
}

export interface UnifiedReceipt {
  receiptId: ReceiptId
  intentId: IntentId
  executionId: ExecutionId
  status: ReceiptStatus
  steps: ExecutionStep[]
  totalFeePaid?: Amount
  totalGasUsed?: Amount
  createdAt: Timestamp
  confirmedAt?: Timestamp
}

export interface LogicalTransaction {
  intentId: IntentId
  ucaId: UcaId
  type: IntentType
  status: ReceiptStatus
  steps: ExecutionStep[]
  receipt?: UnifiedReceipt
  createdAt: Timestamp
  completedAt?: Timestamp
}

export interface ProtocolError {
  code: ErrorCode
  message: string
  details?: Record<string, unknown>
  correlationId?: CorrelationId
  retryable?: boolean
  retryAfter?: number
}

export interface AdapterCapabilities {
  chainId: ChainId
  chainName: string
  features: {
    smartAccounts: boolean
    sponsorship: boolean
    simulation: boolean
    cancellation: boolean
    batching: boolean
  }
  maxGasLimit?: Amount
  supportedAccountTypes?: AccountType[]
}
