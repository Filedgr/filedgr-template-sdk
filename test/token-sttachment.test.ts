import DigiCertApi from '../src/index'
import { streamAttachmentData } from './data'

describe('DigiCert SDK', () => {
  describe('getTokensAttachment', () => {
    it('should fetch token attachments with the given token code, page size, and page number', async () => {
      const expectedData = streamAttachmentData

      jest
        .spyOn(DigiCertApi.prototype, 'getTokensAttachment')
        .mockResolvedValueOnce(expectedData)

      const sdk = new DigiCertApi({
        bearerToken: 'test_token',
      })

      const tokenAttachmentResult = await sdk.getTokensAttachment({
        tokenCode: 'test_token_code',
        pageSize: '10',
        page: '1',
      })

      expect(tokenAttachmentResult).toEqual(expectedData)
    })
  })
})
