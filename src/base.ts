import fetch from 'isomorphic-unfetch'
import { API_URL } from './constants'

type Config = {
  bearerToken: string
  baseUrl?: string
}

export abstract class BaseAsync {
  private bearerToken: string
  public baseUrl: string

  constructor(config: Config) {
    this.bearerToken = config.bearerToken
    this.baseUrl = config.baseUrl || API_URL
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
