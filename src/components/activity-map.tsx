import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Activity } from "@/types/activity";

declare global {
  interface Window {
    google: any;
  }
}

interface ActivityMapProps {
  activities: Activity[];
  userLocation?: { lat: number; lng: number };
}

const ActivityMap: React.FC<ActivityMapProps> = ({
  activities,
  userLocation,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  if (!isLoaded) return <div>Lädt Karte...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "500px" }}
      zoom={14}
      center={userLocation || { lat: 48.1351, lng: 11.582 }} // Standard: München
    >
      {/* ✅ Platziert die Marker auf der Karte */}
      {activities.map((activity) => (
        <Marker
          key={activity.id}
          position={{ lat: activity.latitude, lng: activity.longitude }}
          title={activity.title}
          icon={{
            url: activity.image_url, // ✅ Nutzt das Google Maps Bild des Ortes
            scaledSize: new window.google.maps.Size(40, 40), // Icon-Größe
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default ActivityMap;
