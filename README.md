# FileDGR DigiCert SDK

A TypeScript/JavaScript SDK for interacting with the FileDGR DigiCert API. This SDK provides easy access to FileDGR's stream attachment and data management functionalities.

## Features

- Stream attachment management
- Data attachment retrieval
- TypeScript support with full type definitions
- Environment-specific configurations (dev, test, prod)
- Promise-based async API
- Public access token available for testing

## Installation

```bash
npm install @filedgr/digicert-sdk
# or
yarn add @filedgr/digicert-sdk
```

## Quick Start

You can use the public token 'public' to test the SDK:

```typescript
import DigiCertApi from '@filedgr/digicert-sdk';
import { Environment } from '@filedgr/digicert-sdk/constants';

// Initialize the SDK with public token
const client = new DigiCertApi({
  bearerToken: 'public',
  environment: Environment.DEV // Optional: defaults to DEV
});

// Get stream attachments
const streamAttachments = await client.getTokensAttachment({
  tokenCode: 'FLDGR_aIXzDt',
  pageSize: '10', // Optional
  page: '1'      // Optional
});

// Get specific data attachment
const dataAttachment = await client.getDataAttachment('26eb8860-1c37-4978-8658-84270e65d11e');
```

## Configuration

The SDK can be initialized with different configurations. You can use the public token for testing:

```typescript
// Default configuration (DEV environment) with public token
const defaultClient = new DigiCertApi({
  bearerToken: 'public'
});

// Test environment
const testClient = new DigiCertApi({
  bearerToken: 'public',
  environment: Environment.TEST
});

// Production environment
const prodClient = new DigiCertApi({
  bearerToken: 'public', // Note: Public token might have limited access in production
  environment: Environment.PROD
});

// Custom API URL
const customClient = new DigiCertApi({
  bearerToken: 'public',
  baseUrl: 'https://your-custom-url.com'
});
```

## API Reference

### getTokensAttachment

Retrieves stream attachments for a given token code.

```typescript
const client = new DigiCertApi({ bearerToken: 'public' });

const response = await client.getTokensAttachment({
  tokenCode: 'FLDGR_aIXzDt', // Example stream code
  pageSize: '10',  // Optional, defaults to '10'
  page: '1'        // Optional, defaults to '1'
});
```

Response type: `StreamAttachmentResponse`
```typescript
interface StreamAttachmentResponse {
  total_records: number;
  current_page: number;
  total_pages: number;
  content: GetDataAttachmentResponse[];
}
```

### getDataAttachment

Retrieves detailed information about a specific data attachment.

```typescript
const client = new DigiCertApi({ bearerToken: 'public' });

const response = await client.getDataAttachment('26eb8860-1c37-4978-8658-84270e65d11e');
```

Response type: `GetDataAttachmentResponse`
```typescript
interface GetDataAttachmentResponse {
  id: string;
  created_at: string;
  name: string;
  status: DataAttachmentStatus;
  // ... other fields
}
```

## Environment Variables

The SDK supports three environments:

- Development (DEV): `https://digicert-api.dev.filedgr.network`
- Testing (TEST): `https://digicert-api.test.filedgr.network`
- Production (PROD): `https://digicert-api.filedgr.network`

## Error Handling

The SDK throws errors with descriptive messages for various scenarios:

```typescript
try {
  const client = new DigiCertApi({ bearerToken: 'public' });
  const response = await client.getDataAttachment('invalid_id');
} catch (error) {
  if (error.message === 'Unauthorized') {
    // Handle authentication error
  } else {
    // Handle other errors
  }
}
```

## Development

To contribute to the SDK:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests (uses public token):
   ```bash
   npm test          # Run all tests
   npm run test:unit # Run unit tests only
   npm run test:integration # Run integration tests only
   ```

## Types

The SDK includes TypeScript definitions for all responses and inputs. Key types include:

- `DataAttachmentStatus`
- `FileAttachmentStatus`
- `NetworkServerNames`
- `StreamStatus`
- `StreamProgressStep`
- `GetDataAttachmentResponse`
- `StreamAttachmentResponse`
- `FileDto`
- `StreamDto`

## Example Data

Here are some example stream and attachment IDs you can use with the public token:

- Stream Code: `FLDGR_aIXzDt`
- Attachment ID: `26eb8860-1c37-4978-8658-84270e65d11e`

## License

[License Type] - see the [LICENSE.md](LICENSE.md) file for details

## Support

For support, please open an issue in the GitHub repository or contact support@filedgr.network.