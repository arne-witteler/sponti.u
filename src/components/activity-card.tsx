"use client";

import { Activity } from "@/types/activity";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ActivityCardProps {
  activity: Activity;
  onSwipe?: (direction: "left" | "right") => void;
  distance?: number;
  className?: string;
}

export default function ActivityCard({
  activity,
  onSwipe,
  distance = 0,
  className,
}: ActivityCardProps) {
  return (
    <motion.div
      className={`w-full max-w-md mx-auto ${className || ""}`}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe =
          offset.x > 100 ? "right" : offset.x < -100 ? "left" : null;
        if (swipe && onSwipe) {
          onSwipe(swipe);
        }
      }}
    >
      <Card className="overflow-hidden border border-gray-200 shadow-md">
        <div className="relative h-48 w-full">
          <Image
            src={
              activity.image_url ||
              "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80"
            }
            alt={activity.title}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-xl font-bold text-white">{activity.title}</h3>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="mb-4">
            <p className="text-gray-600 line-clamp-2">{activity.description}</p>
          </div>

          <div className="space-y-2">
            {activity.location && (
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-orange-500" />
                <span>{activity.location}</span>
                {distance > 0 && (
                  <span className="ml-auto text-gray-500">
                    {distance.toFixed(1)} km
                  </span>
                )}
              </div>
            )}

            {activity.start_time && (
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-orange-500" />
                <span>
                  {new Date(activity.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {activity.end_time &&
                    ` - ${new Date(activity.end_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                </span>
              </div>
            )}

            {(activity.min_people || activity.max_people) && (
              <div className="flex items-center text-sm">
                <Users className="mr-2 h-4 w-4 text-orange-500" />
                <span>
                  {activity.min_people && activity.max_people
                    ? `${activity.min_people}-${activity.max_people} Personen`
                    : activity.min_people
                      ? `Min. ${activity.min_people} Personen`
                      : `Max. ${activity.max_people} Personen`}
                </span>
              </div>
            )}

            {activity.price !== undefined && activity.price !== null && (
              <div className="flex items-center text-sm font-medium">
                <span className="text-orange-500">
                  {activity.price === 0
                    ? "Kostenlos"
                    : `${activity.price.toFixed(2)} €`}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button
            variant="outline"
            className="flex-1 mr-2"
            onClick={() => onSwipe && onSwipe("left")}
          >
            Überspringen
          </Button>
          <Button className="flex-1 bg-orange-500 hover:bg-orange-600" asChild>
            <a
              href={activity.booking_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buchen
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
