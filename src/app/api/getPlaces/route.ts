import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius") || "2000";
  const type = searchParams.get("type") || "point_of_interest";

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: "Google API Key fehlt" }, { status: 500 });
  }

  if (!lat || !lng) {
    return NextResponse.json({ error: "Latitude oder Longitude fehlt" }, { status: 400 });
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${API_KEY}`;
  console.log("🔎 API-Aufruf:", url); // Debugging

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error_message) {
      console.error("❌ Google API Fehler:", data.error_message);
      return NextResponse.json({ error: data.error_message }, { status: 500 });
    }

    console.log("✅ Orte gefunden:", data.results.length);
    return NextResponse.json(data.results);
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Daten:", error);
    return NextResponse.json({ error: "Fehler beim Abrufen der Daten" }, { status: 500 });
  }
}