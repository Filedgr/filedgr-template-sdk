export type DataAttachmentStatus =
  | 'FILEDGR_RECEIVED'
  | 'FILEDGR_REVIEWED'
  | 'FILEDGR_UPLOADED'
  | 'DCSTORAGE_REPLICATED'
  | 'FILEDGR_DATA_ATTACHMENT_COMPLETED'

export type FileAttachmentStatus =
  | 'FILEDGR_RECEIVED'
  | 'FILEDGR_REVIEWED'
  | 'FILEDGR_UPLOADED'
  | 'DCSTORAGE_REPLICATED'
  | 'FILEDGR_DATA_ATTACHMENT_COMPLETED'

export type NetworkServerNames = 'POLYGON_ZKEVM' | 'XRPL' | 'ETHEREUM'

export type StreamStatus =
  | 'FILEDGR_RECEIVED'
  | 'FILEDGR_REVIEWED'
  | 'DLT_STREAM_ID_REQUESTED'
  | 'DLT_MINTED'
  | 'FILEDGR_STREAM_COMPLETED'

export interface StreamProgressStep {
  step: number
  status: StreamStatus
  completed_at: string | null
}

export interface GetDataAttachmentResponse {
  id: string
  created_at: string
  name: string
  description?: string | null
  status: DataAttachmentStatus
  presigned_url?: string | null
  token_id: string
  filename?: string
  tx_hash?: string | null
  upload_as_zip: boolean
  size?: number | null
  stream: StreamDto | null
  files: FileDto[] | null
  public_vault: boolean
  file_count: number
  config?: {
    is_permissioned: boolean
    is_searchable: boolean
    is_ai_ready: boolean
    short_url: string | null
  }
}

export interface StreamAttachmentResponse {
  total_records: number
  current_page: number
  total_pages: number
  content: GetDataAttachmentResponse[]
}

export interface FileDto {
  id: string
  filename: string
  mimetype: string
  created_at: string
  status: FileAttachmentStatus
  hash: string
  size: number
  cid: string
}

export interface StreamDto {
  id: string
  created_at: string
  asset_code: string | null
  description: string
  ledger: NetworkServerNames
  tx_hash: string | null
  status: StreamStatus
  issuer: string | null
  distribution_wallet: string | null
  mapping: string
  metadata_cid: string | null
  progress: StreamProgressStep[]
}

export interface HTTPValidationError {
  detail: ValidationError[]
}

export interface ValidationError {
  loc: (string | number)[]
  msg: string
  type: string
}

export interface StreamAttachmentInput {
  tokenCode: string
  pageSize?: string
  page?: string
}

export interface DomainWhiteListRequest {
  nft_id: string
  ledger: NetworkServerNames
}

export interface DomainWhiteListResponse {
  nft_id: string
  ledger: NetworkServerNames
  signature: string
}

export type VaultStatus =
  | 'FILEDGR_RECEIVED'
  | 'FILEDGR_REVIEWED'
  | 'DLT_VAULT_ID_REQUESTED'
  | 'DLT_MINTED'
  | 'FILEDGR_VAULT_COMPLETED'

export interface VaultProgressStep {
  step: number
  status: VaultStatus
  completed_at: string | null
}

export interface StreamModel {
  id: string
  created_at: string
  asset_code: string | null
  description: string
  ledger: NetworkServerNames
  tx_hash: string | null
  status: StreamStatus
  issuer: string | null
  distribution_wallet: string | null
  mapping: string
  metadata_cid: string | null
  progress: StreamProgressStep[]
}

export interface VaultModel {
  id: string
  created_at: string
  name: string
  description: string
  template_id: string
  status: VaultStatus
  ledger: string
  tx_hash: string | null
  nft_network_issuer: string | null
  nft_network_owner: string | null
  nft_network_id: string | null
  cid: string | null
  image_cid: string | null
  default_image_cid: string | null
  metadata_cid: string | null
  streams: StreamModel[]
  public: boolean
  archived: boolean
  json_payload: any | null
  image_upload_url: string | null
  custom_image: boolean
  progress: VaultProgressStep[]
  config?: {
    is_permissioned: boolean
    is_searchable: boolean
    is_ai_ready: boolean
    short_url: string | null
  }
  vault_permission_type: 'VIEWER' | 'EDITOR' | 'ADMIN' | 'OWNER'
}

export interface IPFSFileDownloadOptions {
  cid: string
  filename: string
  mimeType: string
  isPublic: boolean
  ledgerInfo?: {
    tx_hash: string
    ledger: NetworkServerNames
  }
}

export interface IPFSFileResponse {
  blob: Blob
  filename: string
  mimeType: string
}

export interface ExplorerViewOptions {
  txHash?: string
  nftId?: string
  ledger: NetworkServerNames
  isTestnet?: boolean
}

export interface ExplorerUrlResult {
  url: string
  networkName: string
  success: boolean
}

export interface ExplorerError {
  success: false
  error: string
  ledger: string
}

// New types for data attachment creation
export interface AddDataAttachmentConfig {
  short_url?: boolean
}

export interface AddDataAttachmentRequest {
  name: string
  description?: string | null
  stream_id: string
  ledger: NetworkServerNames
  filename?: string | null
  upload_as_zip?: boolean
  config?: AddDataAttachmentConfig | null
}

export interface DataAttachmentProgressItem {
  step: number
  status: DataAttachmentStatus
  completed_at?: string | null
}

export interface DataAttachmentConfigDto {
  short_url?: string | null
}

export interface VaultDto {
  id: string
  created_at: string
  name: string
  description?: string | null
  template_id: string
  status: VaultStatus
  ledger: NetworkServerNames
  tx_hash?: string | null
  nft_network_issuer?: string | null
  nft_network_owner?: string | null
  nft_network_id?: string | null
  cid?: string | null
  image_cid?: string | null
  default_image_cid?: string | null
  metadata_cid?: string | null
  streams?: StreamDto[] | null
  json_payload?: string | null
  image_upload_url?: string | null
  custom_image?: boolean | null
  vault_permission_type?:
    | 'OWNER'
    | 'ADMIN'
    | 'EDITOR'
    | 'VIEWER'
    | 'CUSTOM'
    | null
  config?: DataAttachmentConfigDto | null
  progress?: DataAttachmentProgressItem[] | null
  archived?: boolean | null
}

export interface AddDataAttachmentResponse {
  id: string
  name: string
  description?: string | null
  created_at: string
  ledger: NetworkServerNames
  status: DataAttachmentStatus
  presigned_url?: string | null
  public_vault?: boolean | null
  stream_id: string
  filename?: string | null
  tx_hash?: string | null
  upload_as_zip: boolean
  size?: number | null
  stream?: StreamDto | null
  vault?: VaultDto | null
  file_count?: number | null
  files?: FileDto[] | null
  progress?: DataAttachmentProgressItem[] | null
  config?: DataAttachmentConfigDto | null
}
