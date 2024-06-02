import {
  Editable as EditableContext,
  EditablePreview,
  Input,
  EditableInput,
  useEditableControls,
  ButtonGroup,
  Flex,
  IconButton,
  EditableProps,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaCheck, FaTimes, FaPen } from "react-icons/fa";

interface Props {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  editableProps?: EditableProps;
}
export const EditableTextField = ({
  placeholder = "",
  value,
  onChange,
  editableProps,
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
    >
      <EditableInner />
    </EditableContext>
  );
};

export const EditableInner = () => {
  const { t } = useTranslation("");
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();
  return (
    <>
      <EditablePreview textAlign={"center"} />
      <Input as={EditableInput} />
      {isEditing ? (
        <ButtonGroup justifyContent="center" size="sm">
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
            size="sm"
            icon={<FaPen />}
            {...getEditButtonProps()}
          />
        </Flex>
      )}
    </>
  );
};
