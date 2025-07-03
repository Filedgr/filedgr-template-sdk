export enum Environment {
  DEV = 'dev',
  TEST = 'test',
  PROD = 'prod',
}

export const API_URLS: Record<Environment, string> = {
  [Environment.DEV]: 'https://template-api.dev.filedgr.network',
  [Environment.TEST]: 'https://template-api.test.filedgr.network',
  [Environment.PROD]: 'https://template-api.filedgr.network',
}

export const IPFS_URLS: Record<
  Environment,
  { public: string; private: string }
> = {
  [Environment.DEV]: {
    public: 'ipfs.pub.dev.filedgr.network',
    private: 'ipfs.priv.dev.filedgr.network',
  },
  [Environment.TEST]: {
    public: 'ipfs.pub.test.filedgr.network',
    private: 'ipfs.priv.test.filedgr.network',
  },
  [Environment.PROD]: {
    public: 'ipfs.pub.filedgr.network',
    private: 'ipfs.priv.filedgr.network',
  },
}

export const DEFAULT_ENV = Environment.DEV

// Network Explorer Configuration
export interface NetworkExplorerConfig {
  serverName: string
  mainnet: {
    explorerUrl: string
    name: string
  }
  testnet: {
    explorerUrl: string
    name: string
  }
}

export const NETWORK_EXPLORERS: Record<string, NetworkExplorerConfig> = {
  POLYGON_ZKEVM: {
    serverName: 'POLYGON_ZKEVM',
    mainnet: {
      explorerUrl: 'https://zkevm.polygonscan.com',
      name: 'Polygon zkEVM Mainnet',
    },
    testnet: {
      explorerUrl: 'https://cardona-zkevm.polygonscan.com',
      name: 'Polygon zkEVM Testnet',
    },
  },
  XRPL: {
    serverName: 'XRPL',
    mainnet: {
      explorerUrl: 'https://xrplexplorer.com',
      name: 'XRPL Mainnet',
    },
    testnet: {
      explorerUrl: 'https://test.xrplexplorer.com',
      name: 'XRPL Testnet',
    },
  },
  ETHEREUM: {
    serverName: 'ETHEREUM',
    mainnet: {
      explorerUrl: 'https://etherscan.io',
      name: 'Ethereum Mainnet',
    },
    testnet: {
      explorerUrl: 'https://sepolia.etherscan.io',
      name: 'Ethereum Sepolia Testnet',
    },
  },
}

// Helper functions for explorer URLs
export const getExplorerConfig = (
  ledger: string,
  isTestnet: boolean = false
): { explorerUrl: string; name: string } | null => {
  const network = NETWORK_EXPLORERS[ledger]
  if (!network) {
    return null
  }

  return isTestnet ? network.testnet : network.mainnet
}

export const getTransactionUrl = (
  txHash: string,
  ledger: string,
  isTestnet: boolean = false
): string | null => {
  const config = getExplorerConfig(ledger, isTestnet)
  if (!config) {
    return null
  }

  return `${config.explorerUrl}/tx/${txHash}`
}

export const getNFTUrl = (
  nftId: string,
  ledger: string,
  isTestnet: boolean = false
): string | null => {
  const config = getExplorerConfig(ledger, isTestnet)
  if (!config) {
    return null
  }

  // Different networks might have different NFT URL patterns
  switch (ledger) {
    case 'XRPL':
      return `${config.explorerUrl}/nft/${nftId}`
    case 'ETHEREUM':
    case 'POLYGON_ZKEVM':
      return `${config.explorerUrl}/token/${nftId}`
    default:
      return `${config.explorerUrl}/nft/${nftId}`
  }
}
