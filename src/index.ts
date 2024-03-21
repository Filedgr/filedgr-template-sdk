import { DigiCert as DigiCertClass } from "./async";
import { BaseAsync } from "./base";
import { applyMixins } from "./utils";

class DigiCert extends BaseAsync {}
interface DigiCert extends DigiCertClass {}

applyMixins(DigiCert, [DigiCertClass]);

export default DigiCert;
