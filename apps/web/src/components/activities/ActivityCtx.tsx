import { PropsWithChildren, createContext, useContext } from "react";
import { Activity } from "../../types/activity";
import { ActivityUser } from "../../types/activity-user";

const activityCtx = createContext<{
  activity: Activity;
  activityUser: ActivityUser;
} | null>(null);

export const ActivityProvider = ({
  activity,
  children,
  activityUser,
}: PropsWithChildren<{
  activity: Activity;
  activityUser: ActivityUser;
}>) => {
  return (
    <activityCtx.Provider value={{ activity, activityUser }}>
      {children}
    </activityCtx.Provider>
  );
};

export const useActivityProvider = () => {
  const ctx = useContext(activityCtx);
  if (!ctx) {
    throw Error("Missing Activity Context");
  }
  return ctx;
};
