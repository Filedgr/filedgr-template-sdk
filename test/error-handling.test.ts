import DigiCertApi from '../src/index'
import { dataAttachmentData } from './data'

describe('DigiCertApi', () => {
  describe('getDataAttachment', () => {
    test('should return attachment data when API call is successful', async () => {
      const expectedData = dataAttachmentData

      // Mocking the API call
      jest
        .spyOn(DigiCertApi.prototype, 'getDataAttachment')
        .mockResolvedValueOnce(expectedData)

      const sdk = new DigiCertApi({
        bearerToken: 'test_token',
        baseUrl: 'https://example.com',
      })
      const dataAttachment = await sdk.getDataAttachment('attachment_id')

      expect(dataAttachment).toEqual(expectedData)
    })

    test('should throw an error when API call returns a non-200 status code', async () => {
      // Mocking the API call
      jest
        .spyOn(DigiCertApi.prototype, 'getDataAttachment')
        .mockRejectedValueOnce(new Error('Internal Server Error'))

      const sdk = new DigiCertApi({
        bearerToken: 'test_token',
        baseUrl: 'https://example.com',
      })

      await expect(sdk.getDataAttachment('nonexistent_id')).rejects.toThrow(
        'Internal Server Error'
      )
    })
  })
})
