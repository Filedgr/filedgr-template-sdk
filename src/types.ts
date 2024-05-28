export type DataAttachmentStatus =
  | 'UPLOAD_PENDING'
  | 'REPLICATION_PENDING'
  | 'ATTACHED'
export type FileAttachmentStatus =
  | 'UPLOAD_PENDING'
  | 'REPLICATION_PENDING'
  | 'ATTACHED'
export type Ledgers = 'XRPL'
export type TokenStatus = 'SUBMITTED' | 'CREATED' | 'MINTED'

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
  token: TokenDto | null
  files: FileDto[] | null
  file_count: number
}

export interface TokenAttachmentResponse {
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
  hash?: string | null
  size: number
  cid?: string | null
}

export interface TokenDto {
  id: string
  created_at: string
  asset_code: string
  description?: string | null
  ledger: Ledgers
  status: TokenStatus
  issuer_wallet?: string | null
  mapping?: string | null
}

export interface HTTPValidationError {
  detail: ValidationError[]
}

export interface ValidationError {
  loc: (string | number)[]
  msg: string
  type: string
}

export interface TokenAttachmentInp {
  tokenCode: string
  pageSize?: string
  page?: string
}
