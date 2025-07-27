import { IconQuery, ImageUploadResponse } from "../models";
import { TwoAuthApi } from "../TwoAuthApi";
import { BaseRoute } from "../util";

export class TwoAuthIcons {
  private api: TwoAuthApi;

  public constructor(api: TwoAuthApi) {
    this.api = api;
  }

  /**
   * Upload and store an icon on the server.
   *
   * @param image - An image file
   *
   * @returns The icon filname
   */
  public async upload(image: FormData): Promise<ImageUploadResponse> {
    const res = await this.api.post<ImageUploadResponse>(
      BaseRoute.Icons,
      image,
    );
    return res.data;
  }

  /**
   * Get an official icon of a given service.
   *
   * @param query - The data used to request an icon
   *
   * @returns The filename of the requested icon, if successful
   */
  public async query(data: IconQuery): Promise<ImageUploadResponse> {
    const res = await this.api.post<ImageUploadResponse>(BaseRoute.Icons, data);
    return res.data;
  }

  /**
   * Delete an icon from the server.
   *
   * @param filename - Filename (with extension) of the icon file to delete from the server
   */
  public async delete(filename: string): Promise<void> {
    await this.api.delete(`${BaseRoute.Icons}/${filename}`);
  }
}
