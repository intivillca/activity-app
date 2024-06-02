import React, { useState } from "react";
import { Tag, TagCloseButton, TagLabel, Stack, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface TagInputProps {
  onChange: (tags: string[]) => void;
  value: string[];
}

export const TagInput = ({ value = [], onChange }: TagInputProps) => {
  const [newTag, setNewTag] = useState("");
  const { t } = useTranslation("");

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  };

  const handleTagInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && newTag.trim() !== "") {
      onChange([...value, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = value.filter((tag) => tag !== tagToRemove);
    onChange(updatedTags);
  };

  return (
    <>
      <Input
        form="_form"
        placeholder={t("form.enter_tags")}
        value={newTag}
        onChange={handleTagInputChange}
        onKeyDown={handleTagInputKeyDown}
      />
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
            <TagCloseButton onClick={() => handleRemoveTag(tag)} />
          </Tag>
        ))}
      </Stack>
    </>
  );
};
