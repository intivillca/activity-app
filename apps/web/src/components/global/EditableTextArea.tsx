import {
  Editable as EditableContext,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  Flex,
  IconButton,
  EditableProps,
  Textarea,
  EditableTextarea,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaCheck, FaTimes, FaPen } from "react-icons/fa";

interface Props {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  editableProps?: EditableProps;
  isEditable?: boolean;
  label: string;
}
export const EditableTextArea = ({
  placeholder = "",
  value,
  onChange,
  editableProps,
  isEditable = true,
  label,
}: Props) => {
  return (
    <EditableContext
      display={"flex"}
      flexDir={"column"}
      defaultValue={placeholder}
      value={value}
      alignItems={"center"}
      onChange={onChange}
      {...editableProps}
      isDisabled={!isEditable}
    >
      <EditableInner label={label} />
    </EditableContext>
  );
};

interface InnerProps {
  label: string;
}
export const EditableInner = ({ label }: InnerProps) => {
  const { t } = useTranslation("");
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();
  return (
    <>
      <HStack w={"full"}>
        <FormLabel htmlFor="description" fontWeight={"bold"}>
          {label}
        </FormLabel>
        {isEditing ? (
          <ButtonGroup justifyContent="center" size={["md", "md", "sm", "sm"]}>
            <IconButton
              aria-label={t("form.submit")}
              icon={<FaCheck />}
              {...getSubmitButtonProps()}
            />
            <IconButton
              aria-label={t("form.cancel")}
              icon={<FaTimes />}
              {...getCancelButtonProps()}
            />
          </ButtonGroup>
        ) : (
          <Flex justifyContent="center">
            <IconButton
              aria-label={t("form.edit")}
              size={["md", "md", "sm", "sm"]}
              icon={<FaPen />}
              {...getEditButtonProps()}
            />
          </Flex>
        )}
      </HStack>
      <EditablePreview />
      <Textarea as={EditableTextarea} />
    </>
  );
};
