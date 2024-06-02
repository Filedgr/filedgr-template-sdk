import DigiCertApi from '../src/index'

describe('Constructor Argument Check', () => {
  test('Authorization Token Check', async () => {
    try {
      const client = new DigiCertApi({ bearerToken: '' })
      const result = await client.getDataAttachment('dc')
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toBe('Unauthorized')
    }
  })

  test('Default API Check', async () => {
    const client = new DigiCertApi({ bearerToken: '' })

    const DefaultAPI = 'https://digicert-api.dev.filedgr.network'

    expect(client.baseUrl).toBe(DefaultAPI)
  })
})
