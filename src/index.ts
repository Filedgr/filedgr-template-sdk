import { FiledGrTemplateSDK as FiledGrTemplateSDKClass } from './async'
import { BaseAsync } from './base'
import { applyMixins } from './utils'

class FiledGrTemplateSDK extends BaseAsync {}
interface FiledGrTemplateSDK extends FiledGrTemplateSDKClass {}

applyMixins(FiledGrTemplateSDK, [FiledGrTemplateSDKClass])

export default FiledGrTemplateSDK
