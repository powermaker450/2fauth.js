import { ExportResponseType } from "./ExportResponseType";
import { TwoFAccount } from "./TwoFAccount";

interface ExportResponseCommons {
  app: string;
  schema?: number;
  datetime: string;
  data: TwoFAccount<true>[] | string[];
}

interface ExportResponseAsJson extends ExportResponseCommons {
  schema: number;
  data: TwoFAccount<true>[];
}

interface ExportResponseAsOtpAuth extends ExportResponseCommons { 
  schema?: never;
  data: string[];
}

export type ExportResponse<T extends ExportResponseType = ExportResponseType> = 
  T extends "otpauth" ? ExportResponseAsOtpAuth
  : T extends "json" ? ExportResponseAsJson
  : T extends ExportResponseType ? ExportResponseCommons
  : never;
