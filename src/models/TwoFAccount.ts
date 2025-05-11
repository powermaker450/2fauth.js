import { AlgorithmType } from "./AlgorithmType";
import { OtpType } from "./OtpType";

interface TwoFAccountCommons<WithSecret extends boolean = false> {
  id: number | null;
  service: string | null;
  account: string;
  icon: string | null;
  otp_type: OtpType;
  period: number;
  secret: WithSecret extends true ? string : null;
  digits: number | null;
  algorithm: AlgorithmType;
  group_id: number | null;
}

interface TOTPAccount<WithSecret extends boolean = false>
  extends TwoFAccountCommons<WithSecret> {
  otp_type: "totp";
  period: number;
}

interface HOTPAccount<WithSecret extends boolean = false>
  extends TwoFAccountCommons<WithSecret> {
  otp_type: "hotp";
  counter: number;
}

export type TwoFAccount<WithSecret extends boolean = false> =
  | TOTPAccount<WithSecret>
  | HOTPAccount<WithSecret>;
