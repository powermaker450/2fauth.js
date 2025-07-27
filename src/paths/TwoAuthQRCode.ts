import { DecodedQRCode, QRCode } from "../models";
import { TwoAuthApi } from "../TwoAuthApi";
import { BaseRoute } from "../util";

export class TwoAuthQRCode {
  private api: TwoAuthApi;

  public constructor(api: TwoAuthApi) {
    this.api = api;
  }

  /**
   * Get a QR code representing a 2FA account.
   *
   * @param id - The ID of the 2FA account
   *
   * @returns QR code
   */
  public async get(id: number): Promise<QRCode> {
    const res = await this.api.get<QRCode>(`/api/v1/twofaccounts/${id}/qrcode`);
    return res.data;
  }

  /**
   * Decode a QR code. The QR code is expected to be a 2FA resource but any QR code will be decoded.
   *
   * @param data - Image of the QR code
   *
   * @returns Decoded QR code data
   */
  public async decode(data: FormData): Promise<DecodedQRCode> {
    const res = await this.api.post<DecodedQRCode>(
      `${BaseRoute.QrCode}/decode`,
      data,
    );
    return res.data;
  }
}
