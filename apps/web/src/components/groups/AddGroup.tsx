import { Button, Card, CardBody } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";

export const AddGroup = () => {
  const { t } = useTranslation("");
  return (
    <Card>
      <CardBody as={Button} leftIcon={<FaPlus />}>
        {t("groups.add_group")}
      </CardBody>
    </Card>
  );
};
