import { UserRead } from "./UserRead";

export interface AdminUserRead extends UserRead {
  twofaccounts_count: number;
  last_seen_at: string;
  created_at: string;
}
