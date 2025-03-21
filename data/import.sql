-- Erstellen der Tabelle "activities" in SQLite
CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  created_at TEXT,
  name TEXT NOT NULL,
  description TEXT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  address TEXT,
  category TEXT,
  image_url TEXT,
  updated_at TEXT,
  website TEXT,
  phone TEXT,
  rating INTEGER,
  google_place_id TEXT,
  opening_hours TEXT,
  email TEXT
);

-- Einfügen des Beispieldatensatzes
INSERT INTO activities (
  id,
  created_at,
  name,
  description,
  latitude,
  longitude,
  address,
  category,
  image_url,
  updated_at,
  website,
  phone,
  rating,
  google_place_id,
  opening_hours,
  email
)
VALUES (
  '1',
  '2025-03-14 15:43:14.428369+00',
  'BowlingCenter am Roten Rathaus',
  'BowlingCenter mit 18 Bahnen nahe dem Alexanderplatz in Berlin.',
  52.519303,
  13.406091,
  'Rosenthaler Str.51, 10178 Berlin, Deutschland',
  'Sport',
  'https://www.bowling-am-roten-rathaus.de/.cm4all/mediadb/bilder_alt/327810-1733118.jpg',
  '2025-03-14 15:43:14.428369',
  'https://www.bowling-am-roten-rathaus.de',
  '+49302426657',
  3,
  NULL,
  '{"friday":"14:45 - 22:15","monday":"closed","sunday":"10:45 - 18:15","tuesday":"14:45 - 22:15","saturday":"14:45 - 22:15","thursday":"14:45 - 22:15","wednesday":"14:45 - 22:15"}',
  'info@bowling-am-alex.de'
);