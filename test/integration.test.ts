import { Environment } from '../src/constants'
import DigiCertApi from '../src/index'

describe('DigiCert SDK Integration Tests', () => {
  const sdk = new DigiCertApi({
    bearerToken: 'public',
    environment: Environment.DEV,
  })

  describe('getTokensAttachment', () => {
    test('should fetch stream attachments for FLDGR_aIXzDt', async () => {
      const result = await sdk.getTokensAttachment({
        tokenCode: 'FLDGR_aIXzDt',
        pageSize: '10',
        page: '1',
      })

      expect(result).toBeDefined()
      expect(result.content).toBeInstanceOf(Array)
      expect(result.total_records).toBeDefined()
      expect(result.current_page).toBeDefined()
      expect(result.total_pages).toBeDefined()
    }, 100000)
  })

  describe('getDataAttachment', () => {
    test('should fetch specific attachment data', async () => {
      const result = await sdk.getDataAttachment(
        '26eb8860-1c37-4978-8658-84270e65d11e'
      )

      expect(result).toBeDefined()
      expect(result.id).toBe('26eb8860-1c37-4978-8658-84270e65d11e')
      expect(result.stream).toBeDefined()
      expect(result.files).toBeDefined()
    }, 100000)
  })
})
