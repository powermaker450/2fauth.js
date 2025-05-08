import { Account, Group } from "../models";
import { TwoAuthApi } from "../TwoAuthApi";

export class TwoAuthGroups {
  private static readonly BASE_ROUTE = "/api/v1/groups";
  private api: TwoAuthApi;

  public constructor(api: TwoAuthApi) {
    this.api = api;
  }

  /**
   * Find all groups of the authenticated user.
   *
   * @returns An array of groups
   */
  public async getAll(): Promise<Group[]> {
    const res = await this.api.get<Group[]>(TwoAuthGroups.BASE_ROUTE);
    return res.data;
  }

  /**
   * Creates a new group for the authenticated user.
   *
   * @param name - The name of the group
   *
   * @returns The newly created group
   */
  public async create(name: string): Promise<Group> {
    const res = await this.api.post<Group>(TwoAuthGroups.BASE_ROUTE, { name });
    return res.data;
  }

  /**
   * Get a single group of the authenticated user.
   *
   * @param id - The ID of the group
   *
   * @returns The group associated with the id
   */
  public async get(id: number): Promise<Group> {
    const res = await this.api.get<Group>(TwoAuthGroups.BASE_ROUTE + `/${id}`);
    return res.data;
  }

  /**
   * Updates the group of the authenticated user.
   *
   * @param id - The ID of the group
   * @param name - The name to rename the group to
   *
   * @returns The newly updated group
   */
  public async update(id: number, name: string): Promise<Group> {
    const res = await this.api.put<Group>(TwoAuthGroups.BASE_ROUTE + `/${id}`, {
      name,
    });
    return res.data;
  }

  /**
   * Deletes a group of the authenticated user. This will not delete any assigned 2FA accounts.
   *
   * @param id - The ID of the group
   */
  public async delete(id: number): Promise<void> {
    await this.api.delete(TwoAuthGroups.BASE_ROUTE + `/${id}`);
  }

  /**
   * Adds a list of 2FA accounts to a group of the authenticated user. An account previously assigned to another group will be removed from it's former group. The 2FA accounts must be owned by the authenticated user.
   *
   * @param id - The ID of the group
   * @param ids - An array of 2FA account IDs
   *
   * @returns The newly updated group
   */
  public async assign(id: number, ids: number[]): Promise<Group> {
    const res = await this.api.post<Group>(
      TwoAuthGroups.BASE_ROUTE + `/${id}/assign`,
      { ids },
    );
    return res.data;
  }

  /**
   * Finds all existing 2FA accounts assigned to a group of the authenticated user.
   *
   * @param id - The ID of the group
   * @param withSecret - Append the secret property to the accounts
   */
  public async getAccounts<S extends boolean = false>(
    id: number,
    ...args: S extends true ? [S] : []
  ): Promise<Account<S>[]> {
    const res = await this.api.get<Account<S>[]>(
      TwoAuthGroups.BASE_ROUTE + `/${id}/twofaccounts`,
      { withSecret: args[0] },
    );
    return res.data;
  }
}
