import Link from "next/link";
import { ArrowUpRight, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70" />

      <div className="relative pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  SpontanAktiv
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-6 md:mb-8 max-w-xl mx-auto md:mx-0">
                Entdecke spontane Freizeitaktivitäten in deiner Nähe mit nur
                wenigen Klicks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link href="/activity-finder">
                    Aktivitäten finden
                    <ArrowUpRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard">Zum Dashboard</Link>
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">Standortbasiert</span>
                  </div>
                  <p className="text-sm text-gray-600 text-center md:text-left">
                    Aktivitäten in deiner Nähe
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">Personalisiert</span>
                  </div>
                  <p className="text-sm text-gray-600 text-center md:text-left">
                    Nach deinen Präferenzen
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Spontan</span>
                  </div>
                  <p className="text-sm text-gray-600 text-center md:text-left">
                    Sofort verfügbar
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 mt-8 md:mt-0">
              <div className="relative w-full max-w-md mx-auto md:mx-0 md:ml-auto aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80"
                  alt="People enjoying outdoor activities"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
