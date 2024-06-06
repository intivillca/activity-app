import { useState } from "react";
import { LocationInput } from "./LocationInput";
import { LocationDisplay } from "./LocationStatic";
import { Location } from "../../types/global";
import { ButtonGroup, Flex, IconButton, VStack } from "@chakra-ui/react";
import { FaCheck, FaPen } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface Props {
  value: Location | null;
  onChange: (location: Location | null) => void;
}
export const EditableLocation = ({ value, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();
  return (
    <VStack>
      {isEditing ? (
        <LocationInput value={value} onChange={onChange} />
      ) : (
        <LocationDisplay location={value} />
      )}
      <>
        {isEditing ? (
          <ButtonGroup justifyContent="center" size={["md", "md", "sm", "sm"]}>
            <IconButton
              aria-label={t("form.submit")}
              icon={<FaCheck />}
              onClick={() => {
                setIsEditing((prev) => !prev);
              }}
            />
          </ButtonGroup>
        ) : (
          <Flex justifyContent="center">
            <IconButton
              aria-label={t("form.edit")}
              size={["md", "md", "sm", "sm"]}
              icon={<FaPen />}
              onClick={() => {
                setIsEditing((prev) => !prev);
              }}
            />
          </Flex>
        )}
      </>
    </VStack>
  );
};
