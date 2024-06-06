import { useCallback } from "react";
import { GroupRole } from "../types/group-role";

export const useRoleColor = () => {
  return useCallback((role: GroupRole) => {
    switch (role) {
      case "ADMIN":
        return "green";
      case "MEMBER":
        return "gray";
      case "MODERATOR":
        return "yellow";
      default:
        throw Error("Unkown GroupRole");
    }
  }, []);
};
