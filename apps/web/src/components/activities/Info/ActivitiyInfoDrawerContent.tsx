import { VStack } from "@chakra-ui/react";
import { AvatarInput } from "../../global/AvatarInput";
import { useActivityProvider } from "../ActivityCtx";
import { EditableTextField } from "../../global/EditableTextField";
import { LocationInput } from "../../global/LocationInput";
import { LocationDisplay } from "../../global/LocationStatic";
import { stringToLatLng } from "../../../utils/location-utils";

export const ActivityInfoDrawContent = () => {
  const {
    ID,
    createdAt,
    deletedAt,
    description,
    endDate,
    location,
    name,
    startDate,
    tags,
    updatedAt,
    img,
  } = useActivityProvider();
  return (
    <VStack alignItems={"center"}>
      <AvatarInput
        onChange={(file) => {
          console.log(file);
        }}
        value={img?.src}
      />
      <EditableTextField
        onChange={() => {}}
        editableProps={{ fontSize: "2xl", width: "full" }}
        value={name}
      />
      <LocationDisplay location={stringToLatLng(location)} />
    </VStack>
  );
};
