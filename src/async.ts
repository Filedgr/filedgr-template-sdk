import { BaseAsync } from './base'
import { GetDataAttachmentResponse, TokenAttachmentInp, TokenAttachmentResponse } from './types'

export class DigiCert extends BaseAsync {
  async getDataAttachment(
    dataAttachmentId: string
  ): Promise<GetDataAttachmentResponse> {
    return this.request<GetDataAttachmentResponse>(
      `/attachments/${dataAttachmentId}`
    );
  }

  async getTokensAttachment({
    tokenCode,
    page = '1',
    pageSize = '10',
  }: TokenAttachmentInp): Promise<TokenAttachmentResponse> {
    return this.request<TokenAttachmentResponse>(
      `/tokens/${tokenCode}/attachments?${new URLSearchParams({
        page_size: pageSize,
        page: page,
      })}`
    );
  }
}


