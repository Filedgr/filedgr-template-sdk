import { API_URLS, Environment } from '../src/constants'
import FiledGrTemplateSDKApi from '../src/index'

describe('Constructor Argument Check', () => {
  test('Authorization Token Check', async () => {
    try {
      const client = new FiledGrTemplateSDKApi({ bearerToken: '' })
      await client.getDataAttachment('dc')
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toBe('Unauthorized')
    }
  })

  test('Default API Check', () => {
    const client = new FiledGrTemplateSDKApi({ bearerToken: 'test' })
    expect(client.baseUrl).toBe(API_URLS[Environment.DEV])
  })

  test('Environment Selection Check', () => {
    const devClient = new FiledGrTemplateSDKApi({
      bearerToken: 'test',
      environment: Environment.DEV,
    })
    expect(devClient.baseUrl).toBe(API_URLS[Environment.DEV])

    const testClient = new FiledGrTemplateSDKApi({
      bearerToken: 'test',
      environment: Environment.TEST,
    })
    expect(testClient.baseUrl).toBe(API_URLS[Environment.TEST])

    const prodClient = new FiledGrTemplateSDKApi({
      bearerToken: 'test',
      environment: Environment.PROD,
    })
    expect(prodClient.baseUrl).toBe(API_URLS[Environment.PROD])
  })
})
