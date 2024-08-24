import { useDisclosure } from "@chakra-ui/react";
import { AddGroup } from "../AddGroup";
import { ActivityCreateModal } from "./ActivityCreateModal";

export const GroupCreateModalTrigger = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <AddGroup onClick={onOpen} />
      {isOpen && <ActivityCreateModal onClose={onClose} />}
    </>
  );
};
