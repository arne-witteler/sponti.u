import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const latStr = searchParams.get("lat");
  const lngStr = searchParams.get("lng");
  const radiusStr = searchParams.get("radius") || "5000"; // in Metern

  if (!latStr || !lngStr) {
    return NextResponse.json({ error: "Latitude oder Longitude fehlt" }, {
      status: 400,
    });
  }

  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);
  const radius = parseFloat(radiusStr);
  const radiusKm = radius / 1000; // Umrechnung in Kilometer

  // Öffne die SQLite-Datenbank (Passe den Pfad an, falls nötig)
  const db = await open({
    filename: "./data/database.sqlite",
    driver: sqlite3.Database,
  });

  // Verwende einen Subquery, um zuerst den Abstand (distance) zu berechnen und dann mit WHERE zu filtern
  const query = `
    SELECT * FROM (
      SELECT *,
        (6371 * acos(
          cos(radians(?))
          * cos(radians(latitude))
          * cos(radians(longitude) - radians(?))
          + sin(radians(?))
          * sin(radians(latitude))
        )) AS distance
      FROM activities
    ) AS sub
    WHERE distance < ?
    ORDER BY distance
    LIMIT 3;
  `;

  try {
    const activities = await db.all(query, lat, lng, lat, radiusKm);
    console.log("Gefundene Aktivitäten:", activities.length);
    return NextResponse.json(activities);
  } catch (error) {
    console.error("Fehler beim Abrufen der Aktivitäten:", error);
    return NextResponse.json({
      error: "Datenbankfehler",
      details: error instanceof Error ? error.message : error,
    }, { status: 500 });
  }
}
