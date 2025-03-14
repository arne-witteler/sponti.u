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
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function ActivityFinder() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<ActivityPreferences>({
    location: "",
    people: 2,
    ageGroup: "adults",
    timePreference: "today",
  });
  const [isLocating, setIsLocating] = useState(false);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleSelectAddress = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      setPreferences((prev) => ({
        ...prev,
        location: address,
        latitude: lat,
        longitude: lng, // ✅ WICHTIG: Koordinaten setzen
      }));
    } catch (error) {
      console.error("Fehler bei der Geocodierung:", error);
    }
  };

  const handleLocationDetect = () => {
    if (isLocating) return;
    setIsLocating(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const data = await response.json();

            if (data.results.length > 0) {
              const address = data.results[0].formatted_address;
              setPreferences((prev) => ({
                ...prev,
                latitude,
                longitude,
                location: address, // ✅ Speichert echte Adresse
              }));
              setValue(address, false); // Wichtig: Input aktualisieren
            } else {
              setPreferences((prev) => ({
                ...prev,
                latitude,
                longitude,
                location: "Standort nicht gefunden",
              }));
            }
          } catch (error) {
            console.error("Fehler beim Reverse Geocoding:", error);
            setPreferences((prev) => ({
              ...prev,
              latitude,
              longitude,
              location: "Standort konnte nicht geladen werden",
            }));
          }

          setIsLocating(false);
        },
        (error) => {
          console.error("Fehler beim Abrufen des Standorts:", error);
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation wird von deinem Browser nicht unterstützt.");
      setIsLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!preferences.location && !preferences.latitude) {
      alert("Bitte gib eine Adresse ein oder nutze die Standorterkennung!");
      return;
    }

    const params = new URLSearchParams();
    if (preferences.location) params.append("location", preferences.location);
    if (preferences.latitude)
      params.append("lat", preferences.latitude.toString());
    if (preferences.longitude)
      params.append("lng", preferences.longitude.toString());
    if (preferences.people)
      params.append("people", preferences.people.toString());
    if (preferences.ageGroup)
      params.append("ageGroup", preferences.ageGroup.toString());
    if (preferences.timePreference)
      params.append("timePreference", preferences.timePreference);

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
            <h2 className="text-xl font-semibold mb-6">Suche</h2>

            {/* Standortauswahl mit Autocomplete */}
            <div className="mb-6">
              <Label
                htmlFor="location"
                className="block text-sm font-medium mb-2"
              >
                Standort
              </Label>
              <div className="relative">
                {/* Standorterkennung über MapPin */}
                <MapPin
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    isLocating
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-400 cursor-pointer hover:text-gray-600"
                  }`}
                  onClick={() => !isLocating && handleLocationDetect()}
                />

                {/* Google Places Autocomplete Input */}
                <Input
                  id="location"
                  placeholder="Adresse eingeben oder Standort freigeben"
                  className="pl-10"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setPreferences({
                      ...preferences,
                      location: e.target.value,
                    });
                  }}
                  disabled={!ready}
                />

                {/* Autocomplete-Vorschläge anzeigen */}
                {status === "OK" && data.length > 0 && (
                  <ul className="absolute z-10 bg-white border rounded-md w-full mt-1 shadow-md">
                    {data.map((suggestion, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleSelectAddress(suggestion.description)
                        }
                      >
                        {suggestion.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Klicke auf das Standort-Icon, um deine aktuelle Position zu
                erkennen.
              </p>
            </div>

            {/* Personenanzahl bleibt unverändert */}
            <div className="mb-6">
              <Label className="block text-sm font-medium mb-2">
                Personenanzahl
              </Label>
              <span className="text-sm font-medium text-gray-500">
                {preferences.people} Personen
              </span>
              <div className="flex items-center gap-4">
                <Users className="text-gray-400 h-5 w-5" />
                <Slider
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

            {/* Altersgruppe bleibt unverändert */}
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
                    className={`justify-start ${
                      preferences.ageGroup === age.value
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : ""
                    }`}
                    onClick={() =>
                      setPreferences({
                        ...preferences,
                        ageGroup: age.value as "children" | "teens" | "adults",
                      })
                    }
                  >
                    {age.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Zeitpräferenz bleibt unverändert */}
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
                  className={`justify-start ${
                    preferences.timePreference === "today"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : ""
                  }`}
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
                  className={`justify-start ${
                    preferences.timePreference === "tomorrow"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : ""
                  }`}
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

            {/* Aktivitäten suchen Button */}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
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
