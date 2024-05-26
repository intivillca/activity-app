import { useParams } from "react-router-dom";
import { ActivityGroups } from "../components/activities/ActivityGroups";

export const Activities = () => {
  const { ID } = useParams<{ ID: string }>();
  if (!ID) {
    throw Error("ID is missing");
  }
  return <ActivityGroups ID={ID} />;
};
