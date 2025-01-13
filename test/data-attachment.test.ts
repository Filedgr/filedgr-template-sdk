import FiledGrTemplateSDKApi from '../src/index'
import { dataAttachmentData } from './data'

describe('FiledGrTemplateSDKApi', () => {
  describe('getDataAttachment', () => {
    test('should return attachment data when API call is successful', async () => {
      const expectedData = dataAttachmentData

      jest
        .spyOn(FiledGrTemplateSDKApi.prototype, 'getDataAttachment')
        .mockResolvedValueOnce(expectedData)

      const sdk = new FiledGrTemplateSDKApi({
        bearerToken: 'test_token',
      })

      const dataAttachment = await sdk.getDataAttachment('attachment_id')

      expect(dataAttachment).toEqual(expectedData)
    })
  })
})
