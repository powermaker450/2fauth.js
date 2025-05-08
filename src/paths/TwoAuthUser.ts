import { UserRead } from "../models";
import { TwoAuthApi } from "../TwoAuthApi";

export class TwoAuthUser {
  private static readonly BASE_ROUTE = "/api/v1/user";
  private api: TwoAuthApi;

  public constructor(api: TwoAuthApi) {
    this.api = api;
  }
  
  /**
   * Get info about the current user.
   */
  public async getSelf(): Promise<UserRead> {
    const res = await this.api.get<UserRead>(TwoAuthUser.BASE_ROUTE);
    return res.data;
  }
}
