import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { GroupRole } from "../types/group-role";

export const useRoleTranslation = () => {
  const { t } = useTranslation("");
  return useCallback(
    (role: GroupRole) => {
      switch (role) {
        case "ADMIN":
          return t("roles.admin");
        case "MEMBER":
          return t("roles.member");
        case "MODERATOR":
          return t("roles.moderator");
        default:
          throw Error("Unkown GroupRole");
      }
    },
    [t]
  );
};
