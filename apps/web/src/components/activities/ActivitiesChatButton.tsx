import { IconButton } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useActivityProvider } from "./ActivityCtx";

export const ActivitiesChatButton = () => {
  const { t } = useTranslation();
  const {
    activity: { ID },
  } = useActivityProvider();
  return (
    <IconButton
      as={Link}
      to={`/activities/${ID}/chat`}
      colorScheme="white"
      aria-label={t("chat")}
      icon={<FaComment />}
      variant={"ghost"}
    />
  );
};
