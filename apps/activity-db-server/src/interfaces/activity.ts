export interface PostActivity {
  name: string;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  location?: string | null;
  tags?: string[] | null;
  avatarId?: number | null;
}
