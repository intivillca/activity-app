import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { GroupFormFields } from "../Form/GroupFormFields";
import { GroupModalFormWrapper } from "./GroupModalFormWrapper";

interface Props {
  onClose: () => void;
}

export const ActivityCreateModal = ({ onClose }: Props) => {
  const { t } = useTranslation("");
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size={["full", "full", "lg", "lg"]}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <GroupModalFormWrapper onClose={onClose}>
        <ModalHeader>{t("activities.add_group")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <GroupFormFields />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {t("form.cancel")}
          </Button>
          <Button variant="ghost" type="submit">
            {t("form.submit")}
          </Button>
        </ModalFooter>
      </GroupModalFormWrapper>
    </Modal>
  );
};
