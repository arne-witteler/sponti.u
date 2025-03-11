"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Clock, Calendar } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ActivityPreferences } from "@/types/activity";

export default function ActivityFinder() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<ActivityPreferences>({
    location: "",
    people: 2,
    ageGroup: "adults",
    timePreference: "today",
  });
  const [isLocating, setIsLocating] = useState(false);

  const handleLocationDetect = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPreferences({
            ...preferences,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            location: "Dein aktueller Standort",
          });
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
        },
      );
    } else {
      alert("Geolocation wird von deinem Browser nicht unterstützt.");
      setIsLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build query params
    const params = new URLSearchParams();
    if (preferences.location) params.append("location", preferences.location);
    if (preferences.people)
      params.append("people", preferences.people.toString());
    if (preferences.ageGroup)
      params.append("ageGroup", preferences.ageGroup.toString());
    if (preferences.timePreference)
      params.append("timePreference", preferences.timePreference);
    if (preferences.latitude)
      params.append("lat", preferences.latitude.toString());
    if (preferences.longitude)
      params.append("lng", preferences.longitude.toString());

    // Navigate to results page with query params
    router.push(`/activity-finder/results?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Finde spontane Aktivitäten
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-6">Deine Präferenzen</h2>

            {/* Location Selection */}
            <div className="mb-6">
              <Label
                htmlFor="location"
                className="block text-sm font-medium mb-2"
              >
                Standort
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="location"
                  placeholder="Dein aktueller Standort"
                  className="pl-10"
                  value={preferences.location}
                  onChange={(e) =>
                    setPreferences({ ...preferences, location: e.target.value })
                  }
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs"
                  onClick={handleLocationDetect}
                  disabled={isLocating}
                >
                  {isLocating ? "Wird geortet..." : "Orten"}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Oder erlaube der App, deinen Standort automatisch zu erkennen
              </p>
            </div>

            {/* Number of People */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="people" className="block text-sm font-medium">
                  Personenanzahl
                </Label>
                <span className="text-sm font-medium text-gray-500">
                  {preferences.people} Personen
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Users className="text-gray-400 h-5 w-5" />
                <Slider
                  id="people"
                  defaultValue={[preferences.people || 2]}
                  max={10}
                  min={1}
                  step={1}
                  className="flex-1"
                  onValueChange={(value) =>
                    setPreferences({ ...preferences, people: value[0] })
                  }
                />
              </div>
            </div>

            {/* Age Selection */}
            <div className="mb-6">
              <Label className="block text-sm font-medium mb-2">
                Altersgruppe
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Kinder", value: "children" },
                  { label: "Jugendliche", value: "teens" },
                  { label: "Erwachsene", value: "adults" },
                ].map((age) => (
                  <Button
                    key={age.value}
                    type="button"
                    variant={
                      preferences.ageGroup === age.value ? "default" : "outline"
                    }
                    className={`justify-start ${preferences.ageGroup === age.value ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                    onClick={() =>
                      setPreferences({ ...preferences, ageGroup: age.value })
                    }
                  >
                    {age.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Preference */}
            <div className="mb-8">
              <Label className="block text-sm font-medium mb-2">
                Zeitpräferenz
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={
                    preferences.timePreference === "today"
                      ? "default"
                      : "outline"
                  }
                  className={`justify-start ${preferences.timePreference === "today" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                  onClick={() =>
                    setPreferences({ ...preferences, timePreference: "today" })
                  }
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Heute
                </Button>
                <Button
                  type="button"
                  variant={
                    preferences.timePreference === "tomorrow"
                      ? "default"
                      : "outline"
                  }
                  className={`justify-start ${preferences.timePreference === "tomorrow" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                  onClick={() =>
                    setPreferences({
                      ...preferences,
                      timePreference: "tomorrow",
                    })
                  }
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Morgen
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Aktivitäten finden
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Gib deine Präferenzen ein, um spontane Aktivitäten in deiner Nähe
              zu entdecken!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
