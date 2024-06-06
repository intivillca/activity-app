import React, { useCallback, useState } from "react";
import {
  Tag,
  TagCloseButton,
  TagLabel,
  Stack,
  Input,
  InputGroup,
  InputRightAddon,
  IconButton,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaPaperPlane } from "react-icons/fa";

interface TagInputProps {
  onChange: (tags: string[]) => void;
  value: string[];
}

export const TagInput = ({ value = [], onChange }: TagInputProps) => {
  const [newTag, setNewTag] = useState("");
  const { t } = useTranslation("");

  const handleTagInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTag(event.target.value);
    },
    []
  );

  const handleTagInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && newTag.trim() !== "") {
        onChange([...value, newTag.trim()]);
        setNewTag("");
      }
    },
    [newTag, onChange, value]
  );

  const handleClickSendButton = useCallback(() => {
    onChange([...value, newTag.trim()]);
    setNewTag("");
  }, [newTag, onChange, value]);

  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      const updatedTags = value.filter((tag) => tag !== tagToRemove);
      onChange(updatedTags);
    },
    [onChange, value]
  );

  return (
    <>
      <InputGroup>
        <Input
          form="_form"
          placeholder={t("form.enter_tags")}
          value={newTag}
          onChange={handleTagInputChange}
          onKeyDown={handleTagInputKeyDown}
        />
        <InputRightAddon
          as={IconButton}
          aria-label={t("form.submit")}
          icon={<FaPaperPlane />}
          onClick={handleClickSendButton}
        />
      </InputGroup>
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
