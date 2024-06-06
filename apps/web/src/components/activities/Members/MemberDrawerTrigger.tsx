import { useDisclosure, IconButton } from "@chakra-ui/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useActivityProvider } from "../ActivityCtx";
import { MemberDrawer } from "./MemberDrawer";
import { FaUsers } from "react-icons/fa";

export const ActivityMemberDrawerTrigger = () => {
  const {
    activity: { ID },
  } = useActivityProvider();
  const { t } = useTranslation("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <IconButton
        colorScheme="white"
        ref={btnRef}
        aria-label={t("activities.members")}
        icon={<FaUsers />}
        onClick={onOpen}
        variant={"ghost"}
      />
      {isOpen && (
        <MemberDrawer
          activityID={ID}
          onClose={onClose}
          finalFocusRef={btnRef}
        />
      )}
    </>
  );
};
