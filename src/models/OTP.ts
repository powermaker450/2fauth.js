import { OtpType } from "./OtpType";

interface OTPCommons {
  password: string;
  otp_type: OtpType;
}

interface TOTP extends OTPCommons {
  otp_type: "totp";
  generated_at: number;
  period: number;
}

interface HOTP extends OTPCommons {
  otp_type: "hotp";
  counter: number;
}

export type OTP<T extends OtpType = OtpType> = 
  T extends "totp" ? TOTP
  : T extends "hotp" ? HOTP
  : T extends OtpType ? OTPCommons
  : never;
