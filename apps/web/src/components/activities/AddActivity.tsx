import { Tooltip, Avatar } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export const AddActivityButton = () => {
  const { t } = useTranslation("");
  return (
    <Tooltip label={t("activities.add_activity")} placement="right">
      <Avatar
        as={Link}
        to={"/activities/create"}
        cursor={"pointer"}
        bg={"green.500"}
        rounded={"2xl"}
        shadow={"md"}
        _hover={{ rounded: "md" }}
        icon={<FaPlus />}
      />
    </Tooltip>
  );
};
