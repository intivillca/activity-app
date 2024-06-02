import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Box } from "@chakra-ui/react";
import { Location } from "../../types/global";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

interface LocationDisplayProps {
  location: Location | null; // Nullable location
}

export const LocationDisplay = ({ location }: LocationDisplayProps) => {
  const center = {
    lat: location?.lat || 45.8428647,
    lng: location?.lng || 15.8819639,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <Box w={"full"}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        {location && <Marker position={center} />}
      </GoogleMap>
    </Box>
  );
};
