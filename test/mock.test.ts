import DigiCertApi from '../src/index'
import { dataAttachmentData, streamAttachmentData } from './data'

describe('DigiCert SDK Mock Tests', () => {
  describe('getTokensAttachment', () => {
    test('should return mock stream attachment data', async () => {
      jest
        .spyOn(DigiCertApi.prototype, 'getTokensAttachment')
        .mockResolvedValueOnce(streamAttachmentData)

      const sdk = new DigiCertApi({
        bearerToken: 'test_token',
      })

      const result = await sdk.getTokensAttachment({
        tokenCode: 'test_token_code',
        pageSize: '10',
        page: '1',
      })

      expect(result).toEqual(streamAttachmentData)
    })
  })

  describe('getDataAttachment', () => {
    test('should return mock attachment data', async () => {
      jest
        .spyOn(DigiCertApi.prototype, 'getDataAttachment')
        .mockResolvedValueOnce(dataAttachmentData)

      const sdk = new DigiCertApi({
        bearerToken: 'test_token',
      })

      const result = await sdk.getDataAttachment('test_id')
      expect(result).toEqual(dataAttachmentData)
    })
  })
})
