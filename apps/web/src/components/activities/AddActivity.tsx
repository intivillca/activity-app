import { Tooltip, Avatar } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";

interface Props {
  onClick: () => void;
}
export const AddActivityButton = ({ onClick }: Props) => {
  const { t } = useTranslation("");
  return (
    <Tooltip label={t("activities.add_activity")} placement="right">
      <Avatar
        cursor={"pointer"}
        onClick={onClick}
        bg={"green.500"}
        rounded={"2xl"}
        shadow={"md"}
        _hover={{ rounded: "md" }}
        icon={<FaPlus />}
      />
    </Tooltip>
  );
};
