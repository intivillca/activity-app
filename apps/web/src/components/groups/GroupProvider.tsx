import { PropsWithChildren, createContext, useContext } from "react";
import { Group } from "../../types/group";
import { GroupUser } from "../../types/group-user";

const groupCtx = createContext<{
  group: Group;
  groupUser: GroupUser;
} | null>(null);

export const GroupProvider = ({
  group,
  children,
  groupUser,
}: PropsWithChildren<{
  group: Group;
  groupUser: GroupUser;
}>) => {
  return (
    <groupCtx.Provider value={{ group, groupUser }}>
      {children}
    </groupCtx.Provider>
  );
};

export const useGroupProvider = () => {
  const ctx = useContext(groupCtx);
  if (!ctx) {
    throw Error("Missing Group Context");
  }
  return ctx;
};
