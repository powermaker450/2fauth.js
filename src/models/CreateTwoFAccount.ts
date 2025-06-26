import { OtpType } from "./OtpType";

interface TwoFAccountCommons {
  service: string | null;
  account: string;
  icon: string | null;
  otp_type: OtpType;
  secret: string;
  digits: number | null;
  group_id: number | null;
}

interface TOTPAccount extends TwoFAccountCommons {
  otp_type: "totp";
  period: number;
}

interface HOTPAccount extends TwoFAccountCommons {
  otp_type: "hotp";
  counter: number;
}

export type CreateTwoFAccount<T extends OtpType = OtpType> = T extends "totp"
  ? TOTPAccount
  : T extends "hotp"
    ? HOTPAccount
    : T extends OtpType
      ? TwoFAccountCommons
      : never;
