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
import { ActivitiesFormFields } from "../Form/ActivitesFormFields";
import { ActivitiesFormWrapper } from "./ActivityModalFormWrapper";

interface Props {
  onClose: () => void;
}

export const ActivityCreateModal = ({ onClose }: Props) => {
  const { t } = useTranslation("");
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size={["full", "full", "md", "md"]}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ActivitiesFormWrapper>
        <ModalHeader>{t("activities.add_activity")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ActivitiesFormFields />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {t("form.cancel")}
          </Button>
          <Button variant="ghost" type="submit">
            {t("form.submit")}
          </Button>
        </ModalFooter>
      </ActivitiesFormWrapper>
    </Modal>
  );
};
