import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";

export const ChatMessageActions = () => {
  const { t } = useTranslation();
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label={t("chat.actions.actions")}
        icon={<BsThreeDotsVertical />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<FaEdit />}>{t("chat.actions.edit")}</MenuItem>
        <MenuItem icon={<FaTrash />}>{t("chat.actions.delete")}</MenuItem>
      </MenuList>
    </Menu>
  );
};
