import DigiCertApi from '../src/index'
import { dataAttachmentData } from './data'

describe('DigiCertApi', () => {
  describe('getDataAttachment', () => {
    test('should return attachment data when API call is successful', async () => {
      const expectedData = dataAttachmentData

      jest
        .spyOn(DigiCertApi.prototype, 'getDataAttachment')
        .mockResolvedValueOnce(expectedData)

      const sdk = new DigiCertApi({
        bearerToken: 'test_token',
      })

      const dataAttachment = await sdk.getDataAttachment('attachment_id')

      expect(dataAttachment).toEqual(expectedData)
    })
  })
})
