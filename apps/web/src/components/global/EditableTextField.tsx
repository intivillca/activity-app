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
  isEditable?: boolean;
}
export const EditableTextField = ({
  placeholder = "",
  value,
  onChange,
  editableProps,
  isEditable = true,
}: Props) => {
  return (
    <EditableContext
      display={"flex"}
      flexDir={"column"}
      defaultValue={placeholder}
      value={value}
      alignItems={"center"}
      onChange={onChange}
      isDisabled={!isEditable}
      {...editableProps}
    >
      <EditableInner isEditable={isEditable} />
    </EditableContext>
  );
};

export const EditableInner = ({ isEditable }: { isEditable: boolean }) => {
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
      {isEditable && (
        <>
          {isEditing ? (
            <ButtonGroup
              justifyContent="center"
              size={["md", "md", "sm", "sm"]}
            >
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
        </>
      )}
    </>
  );
};
