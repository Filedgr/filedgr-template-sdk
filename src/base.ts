import fetch from 'cross-fetch'
import { API_URLS, DEFAULT_ENV, Environment } from './constants'

type Config = {
  bearerToken: string
  baseUrl?: string
  environment?: Environment
}
//
export abstract class BaseAsync {
  private bearerToken: string
  public baseUrl: string

  constructor(config: Config) {
    this.bearerToken = config.bearerToken

    if (config.baseUrl) {
      this.baseUrl = config.baseUrl
    } else if (config.environment) {
      this.baseUrl = API_URLS[config.environment]
    } else {
      this.baseUrl = API_URLS[DEFAULT_ENV]
    }
  }

  protected async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.bearerToken}`,
    }

    const config = Object.assign({}, options, { headers })

    const response = await fetch(url, config)

    if (response.ok) {
      const data = await response.json()
      return data as T
    }

    const errorResponse = await response.json()

    if (errorResponse?.detail && errorResponse?.detail[0]?.msg) {
      throw new Error(errorResponse?.detail[0].msg)
    }

    throw new Error(errorResponse.message || response.statusText)
  }
}
