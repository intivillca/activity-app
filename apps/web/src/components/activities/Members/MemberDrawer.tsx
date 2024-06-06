import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerProps,
  Spinner,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { ID } from "../../../types/global";
import { getActivityUsers } from "../../../api/activities/getActivityUsers";
import { useTranslation } from "react-i18next";
import { Member } from "./Member";
import { useActivityProvider } from "../ActivityCtx";
import { FaPaperPlane } from "react-icons/fa";

interface Props extends Omit<DrawerProps, "isOpen" | "children"> {
  activityID: ID;
}

export const MemberDrawer = ({ activityID, ...props }: Props) => {
  const { t } = useTranslation();
  const {
    activityUser: { groupRole },
  } = useActivityProvider();
  const { data } = useQuery({
    queryKey: ["Activity-Users", activityID],
    queryFn: () => {
      return getActivityUsers(activityID);
    },
  });
  return (
    <Drawer
      placement="right"
      size={["full", "full", "md", "md"]}
      {...props}
      isOpen={true}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t("activities.members")}</DrawerHeader>

        <DrawerBody>
          {!data ? (
            <Spinner />
          ) : (
            <VStack w="full">
              {data.activityMembers.map((member) => (
                <Member
                  key={member.ID}
                  {...member}
                  currentUserRole={groupRole}
                />
              ))}
            </VStack>
          )}
        </DrawerBody>

        {groupRole === "ADMIN" && (
          <DrawerFooter justifyContent={"center"}>
            <Button colorScheme={"green"} leftIcon={<FaPaperPlane />}>
              {t("activities.invite_members")}
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};
