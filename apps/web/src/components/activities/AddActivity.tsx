import { Tooltip, Avatar } from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";

export const AddActivity = () => {
  const { t } = useTranslation("");
  const addActivity = useCallback(() => {
    /** TODO: add activity modal */
  }, []);
  return (
    <Tooltip label={t("add_activity")} placement="right">
      <Avatar
        cursor={"pointer"}
        bg={"green.500"}
        rounded={"2xl"}
        shadow={"md"}
        _hover={{ rounded: "md" }}
        icon={<FaPlus />}
        onClick={() => {
          addActivity();
        }}
      />
    </Tooltip>
  );
};
