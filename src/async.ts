import { BaseAsync } from './base'
import {
  GetDataAttachmentResponse,
  StreamAttachmentInput,
  StreamAttachmentResponse,
} from './types'

export class FiledGrTemplateSDK extends BaseAsync {
  async getDataAttachment(
    dataAttachmentId: string
  ): Promise<GetDataAttachmentResponse> {
    return this.request<GetDataAttachmentResponse>(
      `/attachments/${dataAttachmentId}`
    )
  }

  async getTokensAttachment({
    tokenCode: streamCode,
    page = '1',
    pageSize = '10',
  }: StreamAttachmentInput): Promise<StreamAttachmentResponse> {
    return this.request<StreamAttachmentResponse>(
      `/streams/${streamCode}/attachments?${new URLSearchParams({
        page_size: pageSize,
        page: page,
      })}`
    )
  }
}
