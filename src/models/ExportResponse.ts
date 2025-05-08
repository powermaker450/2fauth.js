import { TwoFAccount } from "./TwoFAccount";

export interface ExportResponse<OtpAuth extends boolean> {
  app: string;
  schema: OtpAuth extends true ? undefined : number;
  datetime: string;
  data: OtpAuth extends true ? string[] : TwoFAccount<true>;
}
