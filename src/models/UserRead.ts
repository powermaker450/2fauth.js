export interface UserRead {
  id: number;
  name: string;
  email: string;
  oauth_provider: string | null;
  preferences: Record<string, string | number | boolean>;
  is_admin: boolean;
}
