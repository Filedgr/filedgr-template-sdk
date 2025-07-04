import { BaseAsync } from './base'
import {
  IPFS_URLS,
  getExplorerConfig,
  getNFTUrl,
  getTransactionUrl,
} from './constants'
import {
  AddDataAttachmentRequest,
  AddDataAttachmentResponse,
  DomainWhiteListRequest,
  DomainWhiteListResponse,
  ExplorerError,
  ExplorerUrlResult,
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

  async createDataAttachment(
    data: AddDataAttachmentRequest
  ): Promise<AddDataAttachmentResponse> {
    return this.request<AddDataAttachmentResponse>('/attachments', {
      method: 'POST',
      body: JSON.stringify(data),
    })
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

  // ========== EXPLORER METHODS ==========

  /**
   * Get the explorer URL for a transaction
   * @param txHash - Transaction hash
   * @param ledger - Network ledger name
   * @param isTestnet - Whether to use testnet explorer (default: false)
   * @returns Explorer URL result or error
   */
  getTransactionExplorerUrl(
    txHash: string,
    ledger: NetworkServerNames,
    isTestnet: boolean = false
  ): ExplorerUrlResult | ExplorerError {
    try {
      const url = getTransactionUrl(txHash, ledger, isTestnet)
      const config = getExplorerConfig(ledger, isTestnet)

      if (!url || !config) {
        return {
          success: false,
          error: `No explorer configuration found for ledger: ${ledger}`,
          ledger,
        }
      }

      return {
        url,
        networkName: config.name,
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        ledger,
      }
    }
  }

  /**
   * Get the explorer URL for an NFT
   * @param nftId - NFT ID or token ID
   * @param ledger - Network ledger name
   * @param isTestnet - Whether to use testnet explorer (default: false)
   * @returns Explorer URL result or error
   */
  getNFTExplorerUrl(
    nftId: string,
    ledger: NetworkServerNames,
    isTestnet: boolean = false
  ): ExplorerUrlResult | ExplorerError {
    try {
      const url = getNFTUrl(nftId, ledger, isTestnet)
      const config = getExplorerConfig(ledger, isTestnet)

      if (!url || !config) {
        return {
          success: false,
          error: `No explorer configuration found for ledger: ${ledger}`,
          ledger,
        }
      }

      return {
        url,
        networkName: config.name,
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        ledger,
      }
    }
  }

  /**
   * Open transaction in blockchain explorer (browser only)
   * @param txHash - Transaction hash
   * @param ledger - Network ledger name
   * @param isTestnet - Whether to use testnet explorer (default: false)
   * @returns Promise<boolean> - Success status
   */
  async viewTransactionInExplorer(
    txHash: string,
    ledger: NetworkServerNames,
    isTestnet: boolean = false
  ): Promise<boolean> {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      console.warn(
        'viewTransactionInExplorer can only be used in browser environments'
      )
      return false
    }

    const result = this.getTransactionExplorerUrl(txHash, ledger, isTestnet)

    if (!result.success) {
      console.error(
        'Failed to get explorer URL:',
        (result as ExplorerError).error
      )
      return false
    }

    try {
      window.open(
        (result as ExplorerUrlResult).url,
        '_blank',
        'noopener,noreferrer'
      )
      return true
    } catch (error) {
      console.error('Failed to open explorer:', error)
      return false
    }
  }

  /**
   * Open NFT in blockchain explorer (browser only)
   * @param nftId - NFT ID or token ID
   * @param ledger - Network ledger name
   * @param isTestnet - Whether to use testnet explorer (default: false)
   * @returns Promise<boolean> - Success status
   */
  async viewNFTInExplorer(
    nftId: string,
    ledger: NetworkServerNames,
    isTestnet: boolean = false
  ): Promise<boolean> {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      console.warn('viewNFTInExplorer can only be used in browser environments')
      return false
    }

    const result = this.getNFTExplorerUrl(nftId, ledger, isTestnet)

    if (!result.success) {
      console.error(
        'Failed to get explorer URL:',
        (result as ExplorerError).error
      )
      return false
    }

    try {
      window.open(
        (result as ExplorerUrlResult).url,
        '_blank',
        'noopener,noreferrer'
      )
      return true
    } catch (error) {
      console.error('Failed to open explorer:', error)
      return false
    }
  }

  /**
   * Open vault's transaction in blockchain explorer (browser only)
   * Convenience method that uses vault data to open the transaction
   * @param vault - Vault model containing tx_hash and ledger
   * @param isTestnet - Whether to use testnet explorer (default: false)
   * @returns Promise<boolean> - Success status
   */
  async viewVaultTransactionInExplorer(
    vault: VaultModel,
    isTestnet: boolean = false
  ): Promise<boolean> {
    if (!vault.tx_hash) {
      console.error('Vault does not have a transaction hash')
      return false
    }

    return this.viewTransactionInExplorer(
      vault.tx_hash,
      vault.ledger as NetworkServerNames,
      isTestnet
    )
  }

  /**
   * Open vault's NFT in blockchain explorer (browser only)
   * Convenience method that uses vault data to open the NFT
   * @param vault - Vault model containing nft_network_id and ledger
   * @param isTestnet - Whether to use testnet explorer (default: false)
   * @returns Promise<boolean> - Success status
   */
  async viewVaultNFTInExplorer(
    vault: VaultModel,
    isTestnet: boolean = false
  ): Promise<boolean> {
    if (!vault.nft_network_id) {
      console.error('Vault does not have an NFT network ID')
      return false
    }

    return this.viewNFTInExplorer(
      vault.nft_network_id,
      vault.ledger as NetworkServerNames,
      isTestnet
    )
  }
}
