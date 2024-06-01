import { PropsWithChildren, createContext, useContext } from "react";
import { Activity } from "../../types/activity";

const activityCtx = createContext<Activity | null>(null);

export const ActivityProvider = ({
  activity,
  children,
}: PropsWithChildren<{
  activity: Activity;
}>) => {
  return (
    <activityCtx.Provider value={activity}>{children}</activityCtx.Provider>
  );
};

export const useActivityProvider = () => {
  const ctx = useContext(activityCtx);
  if (!ctx) {
    throw Error("Missing Activity Context");
  }
  return ctx;
};
