import { Tooltip, Avatar } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

export const UserGroupsButton = () => {
  const { t } = useTranslation("");
  return (
    <Tooltip label={t("add_activity")} placement="right">
      <Avatar
        as={Link}
        to={"/"}
        cursor={"pointer"}
        bg={"blue.500"}
        rounded={"2xl"}
        shadow={"md"}
        _hover={{ rounded: "md" }}
        icon={<FaUsers />}
      />
    </Tooltip>
  );
};
