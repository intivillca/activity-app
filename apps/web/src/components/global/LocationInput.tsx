import { useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  Libraries,
} from "@react-google-maps/api";
import { Box, Input, FormControl } from "@chakra-ui/react";
import { Location } from "../../types/global";
import { useTranslation } from "react-i18next";
import "./style.css";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: 45.8428647,
  lng: 15.8819639,
};

interface GoogleMapsLocationInputProps {
  value?: Location | null;
  onChange: (location: Location | null) => void;
}

export const LocationInput = ({
  onChange,
  value,
}: GoogleMapsLocationInputProps) => {
  const libraries: Libraries = useMemo(() => ["places"], []);
  const { t } = useTranslation("");
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    value ?? null
  );
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelected({ lat, lng });
      onChange({ lat, lng });
    }
  };

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSelected({ lat, lng });
        onChange({ lat, lng });
      }
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <Box w={"full"}>
      <FormControl mb={4}>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <Input id="location-search" placeholder={t("form.location_search")} />
        </Autocomplete>
      </FormControl>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={selected || center}
        onClick={onMapClick}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </Box>
  );
};
