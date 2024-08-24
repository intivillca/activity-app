import { Button, Card, CardBody } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";

interface Props {
  onClick: () => void;
}
export const AddGroup = ({ onClick }: Props) => {
  const { t } = useTranslation("");
  return (
    <Card>
      <CardBody
        as={Button}
        leftIcon={<FaPlus />}
        onClick={() => {
          onClick();
        }}
      >
        {t("groups.add_group")}
      </CardBody>
    </Card>
  );
};
