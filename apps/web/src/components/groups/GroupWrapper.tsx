import { Spinner } from "@chakra-ui/react";
import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { useAuth } from "../../auth/AuthContext";
import { getGroup } from "../../api/groups/getGroup";
import { getGroupUser } from "../../api/groups/getGroupUser";
import { GroupProvider } from "./GroupProvider";

export const GroupWrapper = () => {
  const { groupID } = useParams<{ groupID: string }>();
  const { userID } = useAuth();
  const { data } = useQuery({
    queryKey: ["Group", groupID],
    queryFn: () => {
      if (!groupID) {
        throw Error("Missing ID");
      }
      return getGroup(groupID);
    },
    enabled: !!groupID,
  });

  const { data: groupUser } = useQuery({
    queryKey: ["GroupUser", groupID, userID],
    queryFn: () => {
      if (!groupID) {
        throw Error("Missing ID");
      }
      return getGroupUser(groupID, userID);
    },
    enabled: !!data,
  });

  if (!data || !groupUser) return <Spinner />;
  return (
    <GroupProvider group={data} groupUser={groupUser}>
      <Outlet />
    </GroupProvider>
  );
};
