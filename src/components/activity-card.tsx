import React from "react";
import { Activity } from "@/types/activity";

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className="border rounded-lg shadow p-4">
      {/* ✅ Zeigt nur das Bild und den Namen */}
      <img
        src={activity.image_url}
        alt={activity.title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-lg font-bold mt-2">{activity.title}</h3>
    </div>
  );
};

export default ActivityCard;
