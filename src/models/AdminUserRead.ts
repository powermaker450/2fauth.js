import { UserRead } from "./UserRead";

export type AdminUserRead = UserRead & {
  twofaccounts_count: number;
  last_seen_at: string;
  created_at: string;
};
