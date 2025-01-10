export enum Environment {
  DEV = 'dev',
  TEST = 'test',
  PROD = 'prod',
}

export const API_URLS: Record<Environment, string> = {
  [Environment.DEV]: 'https://digicert-api.dev.filedgr.network',
  [Environment.TEST]: 'https://digicert-api.test.filedgr.network',
  [Environment.PROD]: 'https://digicert-api.filedgr.network',
}

export const DEFAULT_ENV = Environment.DEV
