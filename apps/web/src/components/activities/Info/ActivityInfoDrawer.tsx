import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaCircleInfo } from "react-icons/fa6";
import { ActivityInfoDrawContent } from "./ActivitiyInfoDrawerContent";

export const ActivityInfoDrawer = () => {
  const { t } = useTranslation("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <IconButton
        colorScheme="white"
        ref={btnRef}
        aria-label={t("activity.info")}
        icon={<FaCircleInfo />}
        onClick={onOpen}
        variant={"ghost"}
      />
      {isOpen && (
        <Drawer
          size={"md"}
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent p="0" m={0}>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody p={0} m={0}>
              <ActivityInfoDrawContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
