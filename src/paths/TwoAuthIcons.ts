import { ImageUploadResponse } from "../models";
import { TwoAuthApi } from "../TwoAuthApi";

export class TwoAuthIcons {
  private static readonly BASE_ROUTE = "/api/v1/icons";
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
    const res = await this.api.post<ImageUploadResponse>(TwoAuthIcons.BASE_ROUTE, image);
    return res.data;
  }

  /**
   * Delete an icon from the server.
   *
   * @param filename - Filename (with extension) of the icon file to delete from the server
   */
  public async delete(filename: string): Promise<void> {
    await this.api.delete(TwoAuthIcons.BASE_ROUTE + `/${filename}`);
  }
}
