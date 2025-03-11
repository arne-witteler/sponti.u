export interface Activity {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  min_age?: number;
  max_age?: number;
  min_people?: number;
  max_people?: number;
  start_time?: string;
  end_time?: string;
  price?: number;
  booking_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ActivityPreferences {
  location?: string;
  latitude?: number;
  longitude?: number;
  people?: number;
  ageGroup?: "children" | "teens" | "adults" | string[];
  timePreference?: "today" | "tomorrow" | string;
}
