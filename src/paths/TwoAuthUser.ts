import { UserRead } from "../models";
import { TwoAuthApi } from "../TwoAuthApi";
import { BaseRoute } from "../util";

export class TwoAuthUser {
  private api: TwoAuthApi;

  public constructor(api: TwoAuthApi) {
    this.api = api;
  }

  /**
   * Get info about the current user.
   */
  public async getSelf(): Promise<UserRead> {
    const res = await this.api.get<UserRead>(BaseRoute.User);
    return res.data;
  }
}
