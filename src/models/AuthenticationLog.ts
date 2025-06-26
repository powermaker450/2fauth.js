import { AuthenticationLogType } from "./AuthenticationLogType";

interface AuthenticationLogCommons {
  id: number;
  ip_address: string;
  user_agent: string;
  browser: string;
  platform: string;
  device: string;
  login_at: string | null;
  logout_at: string | null;
  login_successful: boolean;
  duration: string | null;
  login_method: string;
}

interface SuccessfulAuthentication extends AuthenticationLogCommons {
  login_at: string;
  logout_at: string;
  login_method: string;
}

interface FailedAuthentication extends AuthenticationLogCommons {
  login_at: null;
  logout_at: null;
  duration: null;
}

export type AuthenticationLog<
  T extends AuthenticationLogType = AuthenticationLogType,
> = T extends "success"
  ? SuccessfulAuthentication
  : T extends "fail"
    ? FailedAuthentication
    : T extends AuthenticationLogType
      ? AuthenticationLogCommons
      : never;
