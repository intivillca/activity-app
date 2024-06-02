import { Location } from "../types/global";

export const latLngToString = (
  latLng: Location | null | undefined
): string | null => {
  if (!latLng) {
    return null;
  }
  return `${latLng.lat}/${latLng.lng}`;
};

export const stringToLatLng = (
  str: string | null | undefined
): Location | null => {
  if (!str) {
    return null;
  }
  const parts = str.split("/");
  if (parts.length !== 2) {
    return null; // Invalid format
  }
  const lat = parseFloat(parts[0]);
  const lng = parseFloat(parts[1]);
  if (isNaN(lat) || isNaN(lng)) {
    return null; // Invalid numbers
  }
  return { lat, lng };
};
