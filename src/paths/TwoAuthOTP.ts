import { OTP, OTPAuthUri, CreateTwoFAccount } from "../models";
import { TwoAuthApi } from "../TwoAuthApi";
import { BaseRoute } from "../util";

export class TwoAuthOTP {
  private api: TwoAuthApi;

  public constructor(api: TwoAuthApi) {
    this.api = api;
  }

  /**
   * Get a fresh OTP from a 2FA account.
   *
   * @param id - The ID number of the 2FA account
   *
   * @returns OTP
   */
  public async get(id: number): Promise<OTP> {
    const res = await this.api.get<OTP>(`${BaseRoute.Accounts}/${id}/otp`);
    return res.data;
  }

  /**
   * Create a new 2FA account
   *
   * @param data - Data for the new 2FA account
   *
   * @returns OTP
   */
  public async create(data: CreateTwoFAccount | OTPAuthUri): Promise<OTP> {
    const res = await this.api.post<OTP>(`${BaseRoute.Accounts}/otp`, data);
    return res.data;
  }
}
