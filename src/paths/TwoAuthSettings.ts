import { Setting } from "../models";
import { TwoAuthApi } from "../TwoAuthApi";

export class TwoAuthSettings {
  private static readonly BASE_ROUTE = "/api/v1/settings";
  private api: TwoAuthApi;

  public constructor(api: TwoAuthApi) {
    this.api = api;
  }

  /**
   * List all application settings. This includes 2FAuth native settings and possible additional admin-defined settings.
   *
   * @returns An array of settings
   */
  public async getAll(): Promise<Setting[]> {
    const res = await this.api.get<Setting[]>(TwoAuthSettings.BASE_ROUTE);
    return res.data;
  }

  /**
   * Create a new custom application setting. You are free to use this endpoint to store any data you need to administrate your own app.
   *
   * @param data - A new application setting
   *
   * @returns The newly added setting
   */
  public async add(data: Setting): Promise<Setting> {
    const res = await this.api.post<Setting>(TwoAuthSettings.BASE_ROUTE, data);
    return res.data;
  }

  /**
   * Get a single application setting.
   *
   * @param name - The setting to query
   *
   * @returns An application setting
   */
  public async get(name: string): Promise<Setting> {
    const res = await this.api.get<Setting>(TwoAuthSettings.BASE_ROUTE + `/${name}`);
    return res.data;
  }

  /**
   * Updates an application setting. Will create the setting if it does not exist already.
   *
   * @param name - The setting to update/create
   * @param value - The value to give to the setting
   *
   * @returns THe newly updated setting
   */
  public async update(name: string, value: Setting["value"]): Promise<Setting> {
    const res = await this.api.put<Setting>(TwoAuthSettings.BASE_ROUTE + `/${name}`, { value });
    return res.data;
  }

  /**
   * Deletes a custom application setting.
   *
   * @param name - The setting to delete
   */
  public async delete(name: string): Promise<void> {
    await this.api.delete(TwoAuthSettings.BASE_ROUTE + `/${name}`);
  }
}
