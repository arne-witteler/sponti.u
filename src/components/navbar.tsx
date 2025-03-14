"use client";

import Link from "next/link";
import Image from "next/image";
import { createClient } from "../../supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { MapPin, UserCircle, Menu } from "lucide-react";
import UserProfile from "./user-profile";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-3 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Sponti Logo"
            width={80} // Größe anpassen
            height={80}
            priority // Lädt das Bild schneller
            className="h-12 w-auto md:h-12 lg:h-16"
          />
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-gray-700 hover:text-orange-500"
          >
            Wie es funktioniert
          </Link>
          <Link
            href="/#features"
            className="text-sm font-medium text-gray-700 hover:text-orange-500"
          >
            Funktionen
          </Link>
          <Link
            href="/activity-finder"
            className="text-sm font-medium text-gray-700 hover:text-orange-500"
          >
            Aktivitäten finden
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                href="/activity-finder"
                className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-orange-500"
              >
                <MapPin className="w-4 h-4" />
                <span>Aktivitäten</span>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:inline-flex"
                >
                  Dashboard
                </Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500"
              >
                Anmelden
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  Registrieren
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
