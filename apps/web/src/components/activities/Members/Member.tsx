import { Avatar, Box, HStack, Tag } from "@chakra-ui/react";
import { ActivityUserWithMember } from "../../../types/activity-user";
import { useRoleTranslation } from "../../../utils/use-role-translation";
import { useMemo } from "react";
import { useRoleColor } from "../../../utils/use-role-color";
import { FaCrown } from "react-icons/fa";
import { MemberMenu } from "./MemberMenu";
import { GroupRole } from "../../../types/group-role";
import { getAvatar } from "../../../api-file-server/get-avatar";

export const Member = ({
  groupRole,
  user: { username, avatar, ID },
  currentUserRole,
}: ActivityUserWithMember & { currentUserRole: GroupRole }) => {
  const roleT = useRoleTranslation();
  const roleC = useRoleColor();
  const role = useMemo(() => roleT(groupRole), [groupRole, roleT]);
  const roleColor = useMemo(() => roleC(groupRole), [groupRole, roleC]);
  return (
    <HStack w={"full"}>
      <Avatar src={getAvatar(avatar?.src)} name={username} />
      <Box flex={"1 1 auto"}>{username}</Box>
      <Tag colorScheme={roleColor}>
        {groupRole === "ADMIN" && <FaCrown />}
        {role}
      </Tag>
      {currentUserRole === "ADMIN" && <MemberMenu userID={ID} />}
    </HStack>
  );
};
