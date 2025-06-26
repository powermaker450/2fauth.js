import { SettingValue } from "./SettingValue";

export interface UserRead {
  id: number;
  name: string;
  email: string;
  oauth_provider: string | null;
  preferences: Record<string, SettingValue>;
  is_admin: boolean;
}
