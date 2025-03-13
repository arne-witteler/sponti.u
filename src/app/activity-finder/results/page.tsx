"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ActivityCard from "@/components/activity-card";
import ActivityMap from "@/components/activity-map";
import { Activity } from "@/types/activity";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, MapPin, List } from "lucide-react";

export default function ActivityResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<
    { lat: number; lng: number } | undefined
  >();

  // Präferenzen aus URL-Parametern holen
  const location = searchParams.get("location");
  const people = searchParams.get("people");
  const ageGroup = searchParams.get("ageGroup");
  const timePreference = searchParams.get("timePreference");

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      setError(null);

      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });

              fetchPlaces(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
              console.error("Fehler beim Abrufen des Standorts:", error);
              setError("Standort konnte nicht abgerufen werden.");
              setLoading(false);
            }
          );
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Aktivitäten:", error);
        setError("Fehler beim Laden der Aktivitäten.");
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const fetchPlaces = async (
    latitude: number,
    longitude: number,
    radius = 2000
  ) => {
    try {
      let response = await fetch(
        `/api/getPlaces?lat=${latitude}&lng=${longitude}&radius=${radius}&type=point_of_interest`
      );
      let data = await response.json();

      // Falls keine Orte gefunden werden, erweitere den Suchradius
      let maxAttempts = 2;
      let attempt = 0;
      while ((!data || data.length === 0) && attempt < maxAttempts) {
        radius *= 2; // Radius vergrößern (erst 4km, dann 8km)
        console.warn(`⚠️ Keine Orte gefunden, erhöhe Radius auf ${radius}m...`);

        response = await fetch(
          `/api/getPlaces?lat=${latitude}&lng=${longitude}&radius=${radius}&type=point_of_interest`
        );
        data = await response.json();
        attempt++;
      }

      if (!data || data.length === 0) {
        console.error("❌ Auch mit erweitertem Radius keine Orte gefunden.");
        setError("Keine Orte in deiner Nähe gefunden.");
        setLoading(false);
        return;
      }

      // ✅ Wähle maximal 3 Orte
      const selectedPlaces = data.slice(0, 3);

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
      const formattedActivities: Activity[] = selectedPlaces.map(
        (place: any, index: number) => ({
          id: place.place_id || `activity-${index}`,
          title: place.name,
          description: "",
          image_url: place.photos?.[0]?.photo_reference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
            : "https://via.placeholder.com/400",
          location: place.vicinity || "Unbekannter Standort",
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          min_age: null,
          max_age: null,
          min_people: null,
          max_people: null,
          start_time: null,
          end_time: null,
          price: null,
          booking_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`,
        })
      );

      setActivities(formattedActivities);
    } catch (err) {
      console.error("❌ Fehler beim Abrufen der Orte:", err);
      setError("Fehler beim Abrufen der Orte.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-8 w-8 text-orange-500 animate-spin mb-4" />
            <p className="text-gray-600">Suche nach passenden Aktivitäten...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">
              Keine Aktivitäten gefunden
            </h2>
            <p className="text-gray-600 mb-8">
              Versuche es mit anderen Suchkriterien.
            </p>
            <Button onClick={() => router.push("/activity-finder")}>
              Zurück zur Suche
            </Button>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Aktivitäten für dich</h1>
              <div className="text-sm text-gray-500">
                {activities.length} Ergebnisse
              </div>
            </div>

            <Tabs defaultValue="cards" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="cards" className="flex items-center">
                  <List className="mr-2 h-4 w-4" />
                  Karten
                </TabsTrigger>
                <TabsTrigger value="map" className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Karte
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cards" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="map" className="h-[500px]">
                <ActivityMap
                  activities={activities}
                  userLocation={userLocation}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
function generateRandomActivities(
  latitude: number,
  longitude: number
): import("react").SetStateAction<Activity[]> {
  throw new Error("Function not implemented.");
}

function shuffleArray(data: any[]) {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data;
}
