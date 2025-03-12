export default async function handler(req, res) {
  const { location, radius = 2000, type = "restaurant" } = req.query;
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "Google API Key fehlt" });
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error_message) {
      return res.status(500).json({ error: data.error_message });
    }

    res.status(200).json(data.results);
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Abrufen der Daten" });
  }
}
