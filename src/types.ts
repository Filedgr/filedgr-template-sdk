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
