"use client";

import { Activity } from "@/types/activity";
import { useState, useEffect } from "react";
import { MapPin, Navigation } from "lucide-react";

interface ActivityMapProps {
  activities: Activity[];
  userLocation?: { lat: number; lng: number };
  onSelectActivity?: (activity: Activity) => void;
  selectedActivityId?: string;
  className?: string;
}

export default function ActivityMap({
  activities,
  userLocation,
  onSelectActivity,
  selectedActivityId,
  className,
}: ActivityMapProps) {
  // This is a placeholder component for the map
  // In a real implementation, you would use a library like Google Maps, Mapbox, or Leaflet

  return (
    <div
      className={`relative w-full h-64 md:h-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200 ${className || ""}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-4">
          <Navigation className="mx-auto h-8 w-8 text-blue-600 mb-2" />
          <p className="text-gray-500 text-sm">
            Interaktive Karte wird geladen...
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Hier werden die Aktivitäten auf einer Karte angezeigt
          </p>
        </div>
      </div>

      {/* Activity markers (simplified representation) */}
      <div className="absolute inset-0 p-4">
        {activities.map((activity, index) => {
          // Calculate random positions for demo purposes
          // In a real implementation, you would use actual coordinates
          const top = 20 + ((index * 30) % 180);
          const left = 30 + ((index * 40) % 280);

          return (
            <div
              key={activity.id}
              className={`absolute cursor-pointer transition-all duration-200 ${selectedActivityId === activity.id ? "scale-125 z-10" : ""}`}
              style={{ top: `${top}px`, left: `${left}px` }}
              onClick={() => onSelectActivity && onSelectActivity(activity)}
            >
              <div
                className={`p-1 rounded-full ${selectedActivityId === activity.id ? "bg-blue-600" : "bg-gray-400"}`}
              >
                <MapPin className="h-5 w-5 text-white" />
              </div>
            </div>
          );
        })}

        {/* User location */}
        {userLocation && (
          <div className="absolute" style={{ top: "50%", left: "50%" }}>
            <div className="p-1 rounded-full bg-blue-600 ring-4 ring-blue-200">
              <div className="h-3 w-3 rounded-full bg-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
