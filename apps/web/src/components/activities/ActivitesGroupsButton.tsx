import { IconButton } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { VscTypeHierarchy } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useActivityProvider } from "./ActivityCtx";

export const ActivitiesGroupsButton = () => {
  const { t } = useTranslation();
  const {
    activity: { ID },
  } = useActivityProvider();
  return (
    <IconButton
      as={Link}
      to={`/activities/${ID}`}
      colorScheme="white"
      aria-label={t("activities.groups")}
      icon={<VscTypeHierarchy />}
      variant={"ghost"}
    />
  );
};
