type PreferenceValue = string | number | boolean;

export interface UserRead {
  id: number;
  name: string;
  email: string;
  oauth_provider: string | null;
  preferences: Record<string, PreferenceValue>;
  is_admin: boolean;
}
