import { Setting } from "../models";
import { TwoAuthApi } from "../TwoAuthApi";

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
    const res = await this.api.get<Setting[]>(TwoAuthUserPrefs.BASE_ROUTE);
    return res.data;
  }

  /**
   * Get a single setting.
   */
  public async get(name: string): Promise<Setting> {
    const res = await this.api.get<Setting>(TwoAuthUserPrefs.BASE_ROUTE + `/${name}`);
    return res.data;
  }

  /**
   * Update the value of a user setting.
   *
   * @returns The modified setting
   */
  public async update(name: string, value: string | boolean | number): Promise<Setting<typeof value>> {
    const res = await this.api.put<Setting<typeof value>>(TwoAuthUserPrefs.BASE_ROUTE + `/${name}`, { value });
    return res.data;
  }
}
