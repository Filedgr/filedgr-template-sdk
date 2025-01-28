// src/index.ts
import { FiledGrTemplateSDK as FiledGrTemplateSDKClass } from './async'
import { BaseAsync } from './base'
import { applyMixins } from './utils'

// Re-export everything from constants and types in a namespace
import * as Constants from './constants'
import * as Types from './types'

class FiledGrTemplateSDK extends BaseAsync {}
interface FiledGrTemplateSDK extends FiledGrTemplateSDKClass {}

applyMixins(FiledGrTemplateSDK, [FiledGrTemplateSDKClass])

// Export the namespace
export { Constants, Types }

// Keep the default export
export default FiledGrTemplateSDK
