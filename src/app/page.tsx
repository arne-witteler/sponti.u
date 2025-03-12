import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ArrowUpRight, MapPin, Users, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-yellow-50 opacity-70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                  Sponti
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
                  className="bg-orange-500 hover:bg-orange-600 text-white"
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
            </div>
            <div className="flex-1 mt-8 md:mt-0">
              <div className="relative w-full max-w-md mx-auto md:mx-0 md:ml-auto aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src="https://storage.googleapis.com/tempo-public-assets/outdoor-activities.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold mb-4">Wie es funktioniert</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              In nur drei einfachen Schritten zu deiner nächsten spontanen
              Aktivität
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Standort teilen",
                description:
                  "Gib deinen Standort an oder erlaube der App, ihn automatisch zu erkennen.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Präferenzen angeben",
                description:
                  "Wähle Personenanzahl, Altersgruppe und gewünschte Zeit aus.",
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Aktivitäten entdecken",
                description:
                  "Swipe durch passende Vorschläge und finde deine perfekte Aktivität.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-orange-500 mb-4 flex justify-center md:justify-start">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center md:text-left">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center md:text-left">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold mb-4">Warum Sponti?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Wir machen es einfach, spontan aktiv zu werden
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Standortbasiert",
                description: "Finde Aktivitäten in deiner unmittelbaren Nähe",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Zeitsparend",
                description:
                  "Schnelle Entscheidungsfindung durch intuitive Oberfläche",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Personalisiert",
                description: "Vorschläge basierend auf deinen Präferenzen",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Vielfältig",
                description:
                  "Von Outdoor-Abenteuern bis zu kulturellen Erlebnissen",
              },
              {
                icon: <ArrowUpRight className="w-6 h-6" />,
                title: "Direkte Buchung",
                description: "Buche oder melde dich direkt über die App an",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Echtzeit-Updates",
                description: "Aktuelle Verfügbarkeit und neue Aktivitäten",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-orange-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Bereit für spontane Abenteuer?
          </h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Entdecke Aktivitäten in deiner Nähe und mache das Beste aus deiner
            Freizeit.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-orange-500 hover:bg-gray-100"
          >
            <Link href="/activity-finder">
              Jetzt spotan werden
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
