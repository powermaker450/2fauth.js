import { Setting } from "../models";
import { SettingValue } from "../models/SettingValue";
import { TwoAuthApi } from "../TwoAuthApi";
import { BaseRoute } from "../util";

export class TwoAuthUserPrefs {
  private static readonly BASE_ROUTE = "/api/v1/user/preferences";
  private api: TwoAuthApi;

  public constructor(api: TwoAuthApi) {
    this.api = api;
  }

  /**
   * List all preferences of the current user.
   *
   * @returns An array of settings
   */
  public async getAll(): Promise<Setting[]> {
    const res = await this.api.get<Setting[]>(BaseRoute.UserPrefs);
    return res.data;
  }

  /**
   * Get a single setting.
   */
  public async get(name: string): Promise<Setting> {
    const res = await this.api.get<Setting>(
      `${BaseRoute.UserPrefs}/${name}`
    );
    return res.data;
  }

  /**
   * Update the value of a user setting.
   *
   * @returns The modified setting
   */
  public async update<V extends SettingValue, R extends Setting<V>>(
    name: string,
    value: V,
  ): Promise<R> {
    const res = await this.api.put<Setting<V>>(
      TwoAuthUserPrefs.BASE_ROUTE + `/${name}`,
      { value },
    );

    return res.data as R;
  }
}
