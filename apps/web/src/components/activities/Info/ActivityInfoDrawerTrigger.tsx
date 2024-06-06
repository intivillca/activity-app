import { IconButton, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaCircleInfo } from "react-icons/fa6";
import { useActivityProvider } from "../ActivityCtx";
import { ActivityInfoDrawer } from "./ActivityInfoDrawer";

export const ActivityInfoDrawerTrigger = () => {
  const {
    activityUser: { groupRole },
  } = useActivityProvider();
  const { t } = useTranslation("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <IconButton
        colorScheme="white"
        ref={btnRef}
        aria-label={t("activities.info")}
        icon={<FaCircleInfo />}
        onClick={onOpen}
        variant={"ghost"}
      />
      {isOpen && (
        <ActivityInfoDrawer
          isEditable={groupRole === "ADMIN"}
          size={["full", "full", "md", "md"]}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        />
      )}
    </>
  );
};
