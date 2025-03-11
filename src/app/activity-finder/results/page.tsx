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
import { createClient } from "../../../../supabase/client";
import { Loader2, MapPin, List } from "lucide-react";

// Sample activities for demonstration
const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: "1",
    title: "Kletterpark Abenteuer",
    description:
      "Erlebe Nervenkitzel und Spaß im größten Kletterpark der Region mit verschiedenen Schwierigkeitsstufen für alle Altersgruppen.",
    image_url:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80",
    location: "Walderlebnispark, Stadtwald",
    latitude: 48.1351,
    longitude: 11.582,
    min_age: 6,
    max_age: null,
    min_people: 1,
    max_people: 10,
    start_time: new Date().toISOString(),
    end_time: new Date(Date.now() + 3600000 * 5).toISOString(),
    price: 22.5,
    booking_url: "https://example.com/booking",
  },
  {
    id: "2",
    title: "Stadtführung mit Geheimtipps",
    description:
      "Entdecke versteckte Orte und spannende Geschichten bei dieser alternativen Stadtführung abseits der üblichen Touristenpfade.",
    image_url:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
    location: "Treffpunkt: Marktplatz",
    latitude: 48.1371,
    longitude: 11.5754,
    min_age: null,
    max_age: null,
    min_people: 2,
    max_people: 15,
    start_time: new Date(Date.now() + 3600000).toISOString(),
    end_time: new Date(Date.now() + 3600000 * 3).toISOString(),
    price: 15.0,
    booking_url: "https://example.com/booking",
  },
  {
    id: "3",
    title: "Escape Room Challenge",
    description:
      "Löst knifflige Rätsel und entkommt aus dem Raum in diesem spannenden Live-Escape-Game für Freunde und Familie.",
    image_url:
      "https://images.unsplash.com/photo-1588773846628-13fce0a32105?w=800&q=80",
    location: "Mystery Rooms, Innenstadt",
    latitude: 48.1391,
    longitude: 11.5802,
    min_age: 12,
    max_age: null,
    min_people: 2,
    max_people: 6,
    start_time: new Date(Date.now() + 3600000 * 2).toISOString(),
    end_time: new Date(Date.now() + 3600000 * 3).toISOString(),
    price: 25.0,
    booking_url: "https://example.com/booking",
  },
];

export default function ActivityResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<
    { lat: number; lng: number } | undefined
  >();

  // Get preferences from URL params
  const location = searchParams.get("location");
  const people = searchParams.get("people");
  const ageGroup = searchParams.get("ageGroup");
  const timePreference = searchParams.get("timePreference");

  useEffect(() => {
    // In a real implementation, you would fetch activities from the database
    // based on the user's preferences
    const fetchActivities = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // For now, use sample data
        setActivities(SAMPLE_ACTIVITIES);

        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (error) => {
              console.error("Error getting location:", error);
            },
          );
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      // User liked the activity
      console.log("Liked activity:", activities[currentActivityIndex]);
    } else {
      // User skipped the activity
      console.log("Skipped activity:", activities[currentActivityIndex]);
    }

    // Move to the next activity
    if (currentActivityIndex < activities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
    } else {
      // No more activities, could show a message or fetch more
      console.log("No more activities");
    }
  };

  const currentActivity = activities[currentActivityIndex];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
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
                {currentActivityIndex + 1} von {activities.length}
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
                  <div className="md:col-span-1">
                    {currentActivity && (
                      <ActivityCard
                        activity={currentActivity}
                        onSwipe={handleSwipe}
                        distance={2.3} // Example distance
                      />
                    )}
                  </div>

                  <div className="hidden md:block md:col-span-1 h-[500px]">
                    <ActivityMap
                      activities={activities}
                      userLocation={userLocation}
                      onSelectActivity={(activity) => {
                        const index = activities.findIndex(
                          (a) => a.id === activity.id,
                        );
                        if (index !== -1) {
                          setCurrentActivityIndex(index);
                        }
                      }}
                      selectedActivityId={currentActivity?.id}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="map" className="h-[500px]">
                <ActivityMap
                  activities={activities}
                  userLocation={userLocation}
                  onSelectActivity={(activity) => {
                    const index = activities.findIndex(
                      (a) => a.id === activity.id,
                    );
                    if (index !== -1) {
                      setCurrentActivityIndex(index);
                    }
                  }}
                  selectedActivityId={currentActivity?.id}
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
