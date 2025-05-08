import { AdminUserRead, AuthenticationLog, CreateUser } from "../models";
import { TwoAuthApi } from "../TwoAuthApi";

export class TwoAuthUsers {
  private static readonly BASE_ROUTE = "/api/v1/users";
  private api: TwoAuthApi;

  public constructor(api: TwoAuthApi) {
    this.api = api;
  }
  
  /**
   * Get all registered users. (Requires admin role)
   *
   * @return An array of Users
   */
  public async getAll(): Promise<AdminUserRead> {
    const res = await this.api.get<AdminUserRead>(TwoAuthUsers.BASE_ROUTE);
    return res.data;
  }

  /**
   * Create a new user. (Requires admin role)
   *
   * @return The newly created User
   */
  public async create(data: CreateUser): Promise<AdminUserRead> {
    const res = await this.api.post<AdminUserRead>(TwoAuthUsers.BASE_ROUTE, data);
    return res.data;
  }
  
  /**
   * Get a single registered user. (Requires admin role)
   *
   * @param id - The user ID to query
   *
   * @return A single User
   */
  public async get(id: number): Promise<AdminUserRead> {
    const res = await this.api.get<AdminUserRead>(TwoAuthUsers.BASE_ROUTE + `/${id}`);
    return res.data;
  }
  
  /**
   * Delete a user. (Requires admin role)
   *
   * @param id - The user to delete
   */
  public async delete(id: number): Promise<void> {
    await this.api.delete(TwoAuthUsers.BASE_ROUTE + `/${id}`);
  }

  /**
   * Modify a user's admin permissions. (Requires admin role)
   *
   * @param id - The user to modify
   * @param is_admin - Whether the user should have admin permissions
   *
   * @return The newly updated User
   */
  public async editAdmin(id: number, is_admin: boolean): Promise<AdminUserRead> {
    const res = await this.api.patch<AdminUserRead>(TwoAuthUsers.BASE_ROUTE + `/${id}/promote`, { is_admin });
    return res.data;
  }
  
  /**
   * Reset a user's password. (Requires admin role)
   *
   * @param id - The user to reset password on
   *
   * @return The user the password was reset on
   */
  public async resetPassword(id: number): Promise<AdminUserRead> {
    const res = await this.api.patch<AdminUserRead>(TwoAuthUsers.BASE_ROUTE + `/${id}/password/reset`);
    return res.data;
  }

  /**
   * Delete all of a user's personal access tokens. (Requires admin role)
   *
   * @param id - The user to revoke all personal access tokens from
   */
  public async revokeATs(id: number): Promise<void> {
    await this.api.delete(TwoAuthUsers.BASE_ROUTE + `/${id}/pats`);
  }

  /**
   * Get a login history of a user. (Requires admin role)
   *
   * @param id - The user to check
   * @param limit - The lines of log to return
   * @param period - Timespan in months in which log records to return
   *
   * @return An array of authentication logs
   */
  public async getLoginHistory(id: number, limit?: number, period?: number): Promise<AuthenticationLog[]> {
    const res = await this.api.get<AuthenticationLog[]>(TwoAuthUsers.BASE_ROUTE + `/${id}/authentications`, { limit, period });
    return res.data;
  }

  /**
   * Delete all of a user's WebAuthn credentials.
   *
   * @param id - The user to revoke all WebAuthn credentials from
   */
  public async revokeWebAuthn(id: number): Promise<void> {
    await this.api.delete(TwoAuthUsers.BASE_ROUTE + `/${id}/credentials`);
  }
}
