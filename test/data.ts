import {
  GetDataAttachmentResponse,
  StreamAttachmentResponse,
} from '../src/types'

const dataAttachmentData: GetDataAttachmentResponse = {
  id: 'f9c5cec5-cfb3-43d3-953b-796e185de0f2',
  public_vault: true,
  created_at: '2024-03-19T17:38:11.548916',
  name: 'Car Name',
  status: 'FILEDGR_DATA_ATTACHMENT_COMPLETED',
  presigned_url: '',
  token_id: '02f01ed5-c6b2-4faa-bcd5-4e99159d7619',
  filename: 'My_filename.zip',
  tx_hash: '55F9EEB3BBD0F0462A9C56D7845D4D788347DCA8B870FAE797A7CB51646283A6',
  upload_as_zip: false,
  size: 1636156,
  stream: {
    id: '02f01ed5-c6b2-4faa-bcd5-4e99159d7619',
    created_at: '2024-02-27T09:18:23.923567',
    asset_code: 't_hydroponics',
    description: 'A hydroponics transaction stream',
    ledger: 'XRPL',
    status: 'DLT_MINTED',
    issuer: 'r3n6nN3NGromVzEk6FtXXknSarzQtrVGde',
    distribution_wallet: null,
    mapping: 'hydroponics',
    metadata_cid: null,
    progress: [
      {
        step: 1,
        status: 'FILEDGR_RECEIVED',
        completed_at: '2024-02-27T09:18:23.923567',
      },
      {
        step: 2,
        status: 'DLT_MINTED',
        completed_at: '2024-02-27T09:18:25.923567',
      },
    ],
    tx_hash: '55F9EEB3BBD0F0462A9C56D7845D4D788347DCA8B870FAE797A7CB51646283A6',
  },
  file_count: 2,
  files: [
    {
      id: '12dcc760-a997-45a6-bc91-1e78e9b84ee8',
      filename: 'decentralab.png',
      mimetype: 'image/png',
      created_at: '2024-03-19T17:38:52.038837',
      status: 'FILEDGR_DATA_ATTACHMENT_COMPLETED',
      hash: '3dda57280978d593068dd788a1a034593f49a291073884d8d49fa973675a72f0',
      size: 783672,
      cid: 'bafybeialrhtoacebld2mpeoivocme5unhrglsifo2supeleivjcuxnqjbu',
    },
    {
      id: '2bdfdba9-be99-4405-8705-550f5250daa6',
      filename: 'decentralab_logo.png',
      mimetype: 'image/png',
      created_at: '2024-03-19T17:38:51.917256',
      status: 'FILEDGR_DATA_ATTACHMENT_COMPLETED',
      hash: '8626ef360e66cfcbb64cd225f24fc81eb7cecb19034a768f5bb8664e564cbc19',
      size: 852484,
      cid: 'bafybeifpv5ndjhqwdtyxozb7z2iwt2ugcutuwvjsj6b63ks5kzcl2ivalm',
    },
  ],
  config: {
    is_permissioned: true,
    is_searchable: true,
    is_ai_ready: false,
    short_url: null,
  },
}

const streamAttachmentData: StreamAttachmentResponse = {
  total_records: 7,
  current_page: 1,
  total_pages: 1,
  content: [
    {
      id: 'f9c5cec5-cfb3-43d3-953b-796e185de0f2',
      public_vault: true,
      name: 'Car Name',
      created_at: '2024-03-19T17:38:11.548916',
      status: 'FILEDGR_DATA_ATTACHMENT_COMPLETED',
      presigned_url: '',
      token_id: '02f01ed5-c6b2-4faa-bcd5-4e99159d7619',
      filename: 'My_filename.zip',
      tx_hash:
        '55F9EEB3BBD0F0462A9C56D7845D4D788347DCA8B870FAE797A7CB51646283A6',
      upload_as_zip: false,
      size: 1636156,
      stream: {
        id: '02f01ed5-c6b2-4faa-bcd5-4e99159d7619',
        created_at: '2024-02-27T09:18:23.923567',
        asset_code: 't_hydroponics',
        description: 'A hydroponics transaction stream',
        ledger: 'XRPL',
        status: 'DLT_MINTED',
        issuer: 'r3n6nN3NGromVzEk6FtXXknSarzQtrVGde',
        distribution_wallet: null,
        mapping: 'hydroponics',
        metadata_cid: null,
        progress: [
          {
            step: 1,
            status: 'FILEDGR_RECEIVED',
            completed_at: '2024-02-27T09:18:23.923567',
          },
          {
            step: 2,
            status: 'DLT_MINTED',
            completed_at: '2024-02-27T09:18:25.923567',
          },
        ],
        tx_hash:
          '55F9EEB3BBD0F0462A9C56D7845D4D788347DCA8B870FAE797A7CB51646283A6',
      },
      file_count: 2,
      files: [
        {
          id: '2bdfdba9-be99-4405-8705-550f5250daa6',
          filename: 'decentralab_logo.png',
          mimetype: 'image/png',
          created_at: '2024-03-19T17:38:51.917256',
          status: 'FILEDGR_DATA_ATTACHMENT_COMPLETED',
          hash: '8626ef360e66cfcbb64cd225f24fc81eb7cecb19034a768f5bb8664e564cbc19',
          size: 852484,
          cid: 'bafybeifpv5ndjhqwdtyxozb7z2iwt2ugcutuwvjsj6b63ks5kzcl2ivalm',
        },
        {
          id: '12dcc760-a997-45a6-bc91-1e78e9b84ee8',
          filename: 'decentralab.png',
          mimetype: 'image/png',
          created_at: '2024-03-19T17:38:52.038837',
          status: 'FILEDGR_DATA_ATTACHMENT_COMPLETED',
          hash: '3dda57280978d593068dd788a1a034593f49a291073884d8d49fa973675a72f0',
          size: 783672,
          cid: 'bafybeialrhtoacebld2mpeoivocme5unhrglsifo2supeleivjcuxnqjbu',
        },
      ],
      config: {
        is_permissioned: true,
        is_searchable: true,
        is_ai_ready: false,
        short_url: null,
      },
    },
  ],
}

export { dataAttachmentData, streamAttachmentData }
