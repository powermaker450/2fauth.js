import { UserRead } from "./UserRead";

export type LoginSuccessResponse = {
  message: "authenticated";
} & UserRead;

export interface LoginErrorResponse {
  message: "unauthorized";
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
