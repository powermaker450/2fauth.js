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

export class TwoAuthApi {
  protected axios: Axios;

  public readonly groups: TwoAuthGroups;
  public readonly icons: TwoAuthIcons;
  public readonly otp: TwoAuthOTP;
  public readonly qrcode: TwoAuthQRCode;
  public readonly settings: TwoAuthSettings;
  public readonly accounts: TwoAuthAccounts;
  public readonly self: TwoAuthUser;
  public readonly prefs: TwoAuthUserPrefs;
  public readonly users: TwoAuthUsers;

  public constructor(baseURL: string, token: string) {
    if (!baseURL.startsWith("http")) {
      throw new Error("An invalid URL was provided.");
    }

    this.axios = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${token}` },
    });

    this.groups = new TwoAuthGroups(this);
    this.icons = new TwoAuthIcons(this);
    this.otp = new TwoAuthOTP(this);
    this.qrcode = new TwoAuthQRCode(this);
    this.settings = new TwoAuthSettings(this);
    this.accounts = new TwoAuthAccounts(this);
    this.self = new TwoAuthUser(this);
    this.prefs = new TwoAuthUserPrefs(this);
    this.users = new TwoAuthUsers(this);
  }

  /**
   * @internal
   */
  public async delete(
    url: string,
    params?: object,
  ): Promise<AxiosResponse<void>> {
    return await this.axios.delete<void>(url, { params });
  }

  /**
   * @internal
   */
  public async get<T extends object | unknown = unknown>(
    url: string,
    params?: object,
  ): Promise<AxiosResponse<T>> {
    return await this.axios.get<T>(url, { params });
  }

  /**
   * @internal
   */
  public async post<T extends object | unknown = unknown>(
    url: string,
    data?: object,
    params?: object,
  ): Promise<AxiosResponse<T>> {
    return await this.axios.post<T>(url, data, { params });
  }

  /**
   * @internal
   */
  public async put<T extends object | unknown = unknown>(
    url: string,
    data?: object,
    params?: object,
  ): Promise<AxiosResponse<T>> {
    return await this.axios.put<T>(url, data, { params });
  }

  /**
   * @internal
   */
  public async patch<T extends object | unknown = unknown>(
    url: string,
    data?: object,
  ) {
    return await this.axios.patch<T>(url, data);
  }
}
