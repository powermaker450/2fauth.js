import { Axios } from "axios";

export class TwoAuthApi {
  protected axios: Axios;

  public constructor(baseURL: string) {
    if (!baseURL.startsWith("http")) {
      throw new Error("An invalid URL was provided.");
    }

    this.axios = new Axios({ baseURL });
  }

  public async login() {
  }
}
