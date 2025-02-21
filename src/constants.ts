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

export const DEFAULT_ENV = Environment.DEV
