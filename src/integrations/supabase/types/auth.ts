export type Profile = {
  id: string;
  created_at: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
}

export type ProfileInsert = {
  id: string;
  created_at?: string;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
}

export type ProfileUpdate = {
  id?: string;
  created_at?: string;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
}