import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCrown, FaTrash } from "react-icons/fa";
import { ID } from "../../../types/global";

interface Props {
  userID: ID;
}
export const MemberMenu = ({ userID }: Props) => {
  const { t } = useTranslation();
  const kickUser = useCallback(() => {
    /** TODO: KICKUSER */
    console.log(userID);
  }, [userID]);
  const makeAdmin = useCallback(() => {
    /** TODO: Make admin */
    console.log(userID);
  }, [userID]);
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<BsThreeDotsVertical />}
        variant={"ghost"}
      />

      <MenuList>
        <MenuItem
          icon={<FaCrown />}
          onClick={() => {
            makeAdmin();
          }}
        >
          {t("members.make_admin")}
        </MenuItem>
        <MenuItem
          icon={<FaTrash />}
          onClick={() => {
            kickUser();
          }}
        >
          {t("members.kick")}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
