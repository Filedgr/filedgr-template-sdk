import { BaseAsync } from './base'
import { IPFS_URLS } from './constants'
import {
  DomainWhiteListRequest,
  DomainWhiteListResponse,
  GetDataAttachmentResponse,
  IPFSFileDownloadOptions,
  IPFSFileResponse,
  NetworkServerNames,
  StreamAttachmentInput,
  StreamAttachmentResponse,
  VaultModel,
} from './types'

export class FiledGrTemplateSDK extends BaseAsync {
  async getDataAttachment(
    dataAttachmentId: string
  ): Promise<GetDataAttachmentResponse> {
    return this.request<GetDataAttachmentResponse>(
      `/attachments/${dataAttachmentId}`
    )
  }

  async getTokensAttachment({
    tokenCode: streamCode,
    page = '1',
    pageSize = '10',
  }: StreamAttachmentInput): Promise<StreamAttachmentResponse> {
    return this.request<StreamAttachmentResponse>(
      `/streams/${streamCode}/attachments?${new URLSearchParams({
        page_size: pageSize,
        page: page,
      })}`
    )
  }
  async whiteListDomain(
    data: DomainWhiteListRequest
  ): Promise<DomainWhiteListResponse> {
    return this.request<DomainWhiteListResponse>(`/subdomains`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getVaultByLedger(
    vaultNetworkId: string,
    ledger: NetworkServerNames
  ): Promise<VaultModel> {
    return this.request<VaultModel>(
      `/vaults/${vaultNetworkId}/ledger/${ledger}`
    )
  }

  private getIPFSUrl(cid: string, isPublic: boolean): string {
    const ipfsDomain = isPublic
      ? IPFS_URLS[this.environment].public
      : IPFS_URLS[this.environment].private
    return `https://${cid}.${ipfsDomain}/#/home`
  }

  async downloadIPFSFile(
    options: IPFSFileDownloadOptions
  ): Promise<IPFSFileResponse> {
    const ipfsUrl = this.getIPFSUrl(options.cid, options.isPublic)

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (!options.isPublic) {
      headers['Authorization'] = `Bearer ${this.bearerToken}`

      if (options.ledgerInfo) {
        headers['X-LedgerInfo'] = JSON.stringify({
          tx_hash: options.ledgerInfo.tx_hash,
          ledger: options.ledgerInfo.ledger,
        })
      }
    }

    const response = await fetch(ipfsUrl, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`)
    }

    const blob = await response.blob()
    return {
      blob,
      filename: options.filename,
      mimeType: options.mimeType,
    }
  }

  async downloadAndSaveIPFSFile(
    options: IPFSFileDownloadOptions
  ): Promise<void> {
    const { blob, filename, mimeType } = await this.downloadIPFSFile(options)

    // Create a blob with the correct type if available
    const fileBlob = mimeType ? new Blob([blob], { type: mimeType }) : blob

    // Create a download link
    const downloadUrl = window.URL.createObjectURL(fileBlob)
    const downloadLink = document.createElement('a')
    downloadLink.href = downloadUrl
    downloadLink.download = filename

    // Trigger download
    document.body.appendChild(downloadLink)
    downloadLink.click()

    // Cleanup
    document.body.removeChild(downloadLink)
    window.URL.revokeObjectURL(downloadUrl)
  }
}
