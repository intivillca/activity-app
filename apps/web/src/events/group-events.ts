import { Group } from "../types/group";
import mitt from "mitt";
import { createUseMitt } from "../utils/use-mitt";
export interface NewGroup {
  Group: Group;
}
export type GroupEvents = {
  newGroup: NewGroup;
};

export const groupEvents = mitt<GroupEvents>();

export const useGroupEvents = createUseMitt(groupEvents);

export const handleNewGroup = (Group: Group) => {
  groupEvents.emit("newGroup", { Group });
};
