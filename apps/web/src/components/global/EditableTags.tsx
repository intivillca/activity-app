import { Button, Stack, Tag, TagLabel, Box } from "@chakra-ui/react";
import { useState } from "react";
import { TagInput } from "./TagInput";
import { FaCheck, FaPen } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface EditableTagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export const EditableTagInput = ({
  value,
  onChange,
}: EditableTagInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation("");

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Box>
      {isEditing ? (
        <>
          <TagInput value={value} onChange={onChange} />
          <Button leftIcon={<FaCheck />} onClick={toggleEditing} mt={2}>
            {t("form.save")}
          </Button>
        </>
      ) : (
        <Box>
          <Stack direction="row" mt={2} spacing={2}>
            {value.map((tag, index) => (
              <Tag
                key={index}
                size="md"
                borderRadius="full"
                variant="solid"
                colorScheme="gray"
              >
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))}
          </Stack>
          <Button leftIcon={<FaPen />} onClick={toggleEditing} mt={2}>
            {t("form.edit")}
          </Button>
        </Box>
      )}
    </Box>
  );
};
