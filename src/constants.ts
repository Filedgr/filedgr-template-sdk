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
