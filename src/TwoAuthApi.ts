import axios, { Axios, AxiosResponse } from "axios";
import {
  TwoAuthAccounts,
  TwoAuthGroups,
  TwoAuthIcons,
  TwoAuthOTP,
  TwoAuthQRCode,
  TwoAuthSettings,
  TwoAuthUser,
  TwoAuthUserPrefs,
} from "./paths";
import { TwoAuthUsers } from "./paths/TwoAuthUsers";
import { BaseRoute } from "./util";
import {
  Account,
  AdminUserRead,
  AuthenticationLog,
  ExportResponse,
  Group,
  OTP,
  QRCode,
  Setting,
  TwoFAccount,
  UserRead,
} from "./models";

type DeleteRoute =
  | BaseRoute.Accounts
  | `${BaseRoute.Accounts | BaseRoute.Groups}/${number}`
  | `${BaseRoute.Icons}/${string}`
  | `${BaseRoute.Settings}/${string}`
  | `${BaseRoute.Users}/${number}`
  | `${BaseRoute.Users}/${number}/${"pats" | "credentials"}`;

type GetRoute<R> = R extends TwoFAccount<boolean>[]
  ?
      | BaseRoute.Accounts
      | `${BaseRoute.Accounts | BaseRoute.Groups}/${number}/twofaccounts`
  : R extends AdminUserRead
    ? BaseRoute.Users | `${BaseRoute.Users}/${number}`
    : R extends Account<boolean>
      ? `${BaseRoute.Accounts}/${number}`
      : R extends ExportResponse
        ? `${BaseRoute.Accounts}/export`
        : R extends Group[]
          ? BaseRoute.Groups
          : R extends Group
            ? `${BaseRoute.Groups}/${number}`
            : R extends OTP
              ? `${BaseRoute.Accounts}/${number}/otp`
              : R extends QRCode
                ? `${BaseRoute.Accounts}/${number}/qrcode`
                : R extends Setting[]
                  ? BaseRoute.Settings | BaseRoute.UserPrefs
                  : R extends Setting
                    ? `${BaseRoute.Settings | BaseRoute.UserPrefs}/${string}`
                    : R extends UserRead
                      ? BaseRoute.User
                      : R extends AuthenticationLog[]
                        ? `${BaseRoute.Users}/${number}/authentications`
                        : string;

export class TwoAuthApi {
  protected axios: Axios;

  public constructor(baseURL: string, token: string) {
    if (!baseURL.startsWith("http")) {
      throw new Error("An invalid URL was provided.");
    }

    this.axios = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public readonly groups = new TwoAuthGroups(this);
  public readonly icons = new TwoAuthIcons(this);
  public readonly otp = new TwoAuthOTP(this);
  public readonly qrcode = new TwoAuthQRCode(this);
  public readonly settings = new TwoAuthSettings(this);
  public readonly accounts = new TwoAuthAccounts(this);
  public readonly self = new TwoAuthUser(this);
  public readonly prefs = new TwoAuthUserPrefs(this);
  public readonly users = new TwoAuthUsers(this);

  /**
   * @internal
   */
  public async delete(
    url: DeleteRoute,
    params?: object,
  ): Promise<AxiosResponse<void>> {
    return await this.axios.delete<void>(url, { params });
  }

  /**
   * @internal
   */
  public async get<T extends object | void = object>(
    url: GetRoute<T>,
    params?: object,
  ): Promise<AxiosResponse<T>> {
    return await this.axios.get<T>(url, { params });
  }

  /**
   * @internal
   */
  public async post<T extends object | void = object>(
    url: string,
    data?: object,
    params?: object,
  ): Promise<AxiosResponse<T>> {
    return await this.axios.post<T>(url, data, { params });
  }

  /**
   * @internal
   */
  public async put<T extends object | void = object>(
    url: string,
    data?: object,
    params?: object,
  ): Promise<AxiosResponse<T>> {
    return await this.axios.put<T>(url, data, { params });
  }

  /**
   * @internal
   */
  public async patch<T extends object | void = object>(
    url: string,
    data?: object,
  ): Promise<AxiosResponse<T>> {
    return await this.axios.patch<T>(url, data);
  }
}
