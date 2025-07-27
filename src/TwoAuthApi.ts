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
  DecodedQRCode,
  ExportResponse,
  Group,
  ImageUploadResponse,
  OTP,
  QRCode,
  Setting,
  TwoFAccount,
  UserRead,
} from "./models";
import { SettingValue } from "./models/SettingValue";

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

type PostRoute<T> = T extends AdminUserRead
  ? BaseRoute.Users
  : T extends TwoFAccount<true>
    ? BaseRoute.Accounts
    : T extends TwoFAccount<boolean>[]
      ? `${BaseRoute.Accounts}/migration`
      : T extends TwoFAccount
        ? `${BaseRoute.Accounts}/preview`
        : T extends Group
          ? BaseRoute.Groups | `${BaseRoute.Groups}/${number}/assign`
          : T extends ImageUploadResponse
            ? BaseRoute.Icons
            : T extends OTP
              ? `${BaseRoute.Accounts}/otp`
              : T extends DecodedQRCode
                ? `${BaseRoute.QrCode}/decode`
                : T extends Setting
                  ? BaseRoute.Settings
                  : T extends void
                    ? `${BaseRoute.Accounts}/reorder`
                    : string;

type PutRoute<T> = T extends TwoFAccount
  ? `${BaseRoute.Accounts}/${number}`
  : T extends Group
    ? `${BaseRoute.Groups}/${number}`
    : T extends Setting
      ? `${BaseRoute.Settings}/${string}`
      : T extends Setting<SettingValue>
        ? `${BaseRoute.UserPrefs}/${string}`
        : string;

type PatchRoute<T> = T extends AdminUserRead
  ?
      | `${BaseRoute.Users}/${number}/promote`
      | `${BaseRoute.Users}/${number}/password/reset`
  : T extends { message: string }
    ? `${BaseRoute.Accounts}/withdraw`
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
    url: PostRoute<T>,
    data?: object,
    params?: object,
  ): Promise<AxiosResponse<T>> {
    return await this.axios.post<T>(url, data, { params });
  }

  /**
   * @internal
   */
  public async put<T extends object | void = object>(
    url: PutRoute<T>,
    data?: object,
    params?: object,
  ): Promise<AxiosResponse<T>> {
    return await this.axios.put<T>(url, data, { params });
  }

  /**
   * @internal
   */
  public async patch<T extends object | void = object>(
    url: PatchRoute<T>,
    data?: object,
  ): Promise<AxiosResponse<T>> {
    return await this.axios.patch<T>(url, data);
  }
}
