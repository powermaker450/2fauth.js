import {
  Account,
  CreateTwoFAccount,
  ExportResponse,
  OTPAuthUri,
  TwoFAccount,
} from "../models";
import { ExportResponseType } from "../models/ExportResponseType";
import { TwoAuthApi } from "../TwoAuthApi";
import { BaseRoute } from "../util";

type GetAllArgs<S extends boolean, O extends boolean> = S extends true
  ? O extends true
    ? [S, O]
    : [S]
  : [];

export class TwoAuthAccounts {
  private static readonly BASE_ROUTE = BaseRoute.Accounts;
  private api: TwoAuthApi;

  public constructor(api: TwoAuthApi) {
    this.api = api;
  }

  /**
   * Get all 2FA accounts of the current user.
   *
   * @param withSecret - Append the secret key to the response
   *
   * @returns An array of 2FA accounts
   */
  public async getAll<S extends boolean = false, O extends boolean = false>(
    ...args: GetAllArgs<S, O>
  ): Promise<TwoFAccount<S>[]> {
    const res = await this.api.get<TwoFAccount<S>[]>(BaseRoute.Accounts, {
      withSecret: args[0],
      withOtp: args[1],
    });
    return res.data;
  }

  /**
   * Creates a new 2FA account.
   *
   * @param data - Information to create or preview a 2FA account, or an otpath uri
   *
   * @return A new 2FA account
   */
  public async create(
    data: CreateTwoFAccount | OTPAuthUri,
  ): Promise<Account<true>> {
    const res = await this.api.post<Account<true>>(
      TwoAuthAccounts.BASE_ROUTE,
      data,
    );
    return res.data;
  }

  /**
   * Mass deletes 2FA accounts.
   *
   * @param ids - The account IDs of the accounts to delete
   */
  public async deleteMany(ids: number[]): Promise<void> {
    await this.api.delete(TwoAuthAccounts.BASE_ROUTE, { ids });
  }

  /**
   * Get a single 2FA account.
   *
   * @param id - The ID of the account to get
   *
   * @return A 2FA account
   */
  public async get<S extends boolean = false>(
    id: number,
    ...args: S extends true ? [S] : []
  ): Promise<Account<S>> {
    const res = await this.api.get<Account<S>>(`${BaseRoute.Accounts}/${id}`, {
      withSecret: args[0],
    });
    return res.data;
  }

  /**
   * Update a 2FA account.
   *
   * @param id - The ID of the account to update
   *
   * @return The newly updated 2FA account
   */
  public async update(id: number, data: Account): Promise<Account> {
    const res = await this.api.put<Account>(
      TwoAuthAccounts.BASE_ROUTE + `/${id}`,
      data,
    );
    return res.data;
  }

  /**
   * Delete a 2FA account.
   *
   * @param id - The ID of the account to delete
   */
  public async delete(id: number): Promise<void> {
    await this.api.delete(`${BaseRoute.Accounts}/${id}`);
  }

  /**
   * Convert 2FAs from another 2FA app to a list of 2FA accounts.
   *
   * @param data - Either a JSON object from the content of an export file or FormData with the JSON file attached
   *
   * @return An array of converted 2FA accounts
   *
   */
  public async migrate<S extends boolean = false>(
    payload: string | FormData,
    ...args: S extends true ? [S] : []
  ): Promise<Account<S>[]> {
    const data = typeof payload === "string" ? { payload } : payload;

    const res = await this.api.post<Account<S>[]>(
      TwoAuthAccounts.BASE_ROUTE + "/migration",
      data,
      { withSecret: args[0] },
    );
    return res.data;
  }

  /**
   * Preview a 2FA account using an OTPAuthUri.
   *
   * @param uri - An OTPAuthUri
   *
   * @returns A 2FA account
   */
  public async preview(uri: string): Promise<TwoFAccount> {
    const res = await this.api.post<TwoFAccount>(
      TwoAuthAccounts.BASE_ROUTE + "/preview",
      { uri },
    );
    return res.data;
  }

  /**
   * Save 2FA accounts to display in a specified order.
   *
   * @param ids - An array of IDs, with the order to display them in
   */
  public async reorder(ids: number[]): Promise<void> {
    await this.api.post(TwoAuthAccounts.BASE_ROUTE + "/reorder", { ids });
  }

  /**
   * Removes 2FA accounts from any groups. Does not delete them.
   *
   * @param ids - An array of 2FA account IDs
   *
   * @return A message indicating success
   */
  public async withdraw(ids: number[]): Promise<{ message: string }> {
    const res = await this.api.patch<{ message: string }>(
      TwoAuthAccounts.BASE_ROUTE + "/withdraw",
      { ids },
    );
    return res.data;
  }

  /**
   * Obtain an export list of 2FA accounts.
   *
   * @param ids - An array of 2FA account IDs to obtain
   *
   * @return Either a list of OTPAuthUris or 2FAuth objects
   */
  public async export<O extends ExportResponseType = ExportResponseType>(
    ids: number[],
    ...args: O extends "otpauth" ? [true] : []
  ): Promise<ExportResponse<O>> {
    const res = await this.api.get<ExportResponse<O>>(
      // @ts-ignore
      `${BaseRoute.Accounts}/export`,
      { ids, otpauth: args[0] },
    );
    return res.data;
  }

  /**
   * Get all 2FA accounts within a given group.
   *
   * @param id - The ID of the group to query
   *
   * @return An array of 2FA accounts
   */
  public async getAllInGroup<S extends boolean = false>(
    id: number,
    ...args: S extends true ? [S] : []
  ): Promise<TwoFAccount<S>[]> {
    const res = await this.api.get<TwoFAccount<S>[]>(
      `${BaseRoute.Accounts}/${id}/twofaccounts`,
      { withSecret: args[0] },
    );
    return res.data;
  }
}
