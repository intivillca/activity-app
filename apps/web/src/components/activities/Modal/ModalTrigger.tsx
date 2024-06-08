import { useDisclosure } from "@chakra-ui/react";
import { AddActivityButton } from "../AddActivity";
import { ActivityCreateModal } from "./ActivityCreateModal";

export const ActivityCreateModalTrigger = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <AddActivityButton onClick={onOpen} />
      {isOpen && <ActivityCreateModal onClose={onClose} />}
    </>
  );
};
