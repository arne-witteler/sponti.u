-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  location TEXT,
  latitude FLOAT,
  longitude FLOAT,
  min_age INT,
  max_age INT,
  min_people INT DEFAULT 1,
  max_people INT,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  price DECIMAL(10,2),
  booking_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "Public read access" ON activities;
CREATE POLICY "Public read access"
  ON activities FOR SELECT
  USING (true);

-- Enable realtime
alter publication supabase_realtime add table activities;
