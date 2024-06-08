import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Image,
  Text,
  Button,
  Tag,
  HStack,
  AspectRatio,
} from "@chakra-ui/react";
import { GroupCard as GroupCardProps } from "../../types/group";
import { FaCirclePlus } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { getMediumImg } from "../../api-file-server/get-medium-img";

export const GroupCard = ({
  ID,
  description,
  avatar,
  name,
  type,
  tags,
}: GroupCardProps) => {
  const joinGroup = useCallback((ID: number) => {
    console.log(ID);
  }, []);
  const { t } = useTranslation();
  return (
    <Card
      overflow="hidden"
      direction={{ base: "column", sm: "row" }}
      variant="outline"
    >
      {avatar && (
        <AspectRatio ratio={[1, 1, 3 / 4, 9 / 16]} flex={"0 1 200px"}>
          <Image
            objectFit="cover"
            src={getMediumImg(avatar.src)}
            overflow={"hidden"}
          />
        </AspectRatio>
      )}

      <Stack flex={"1 1 auto"}>
        <CardBody>
          <Heading size="md">{name}</Heading>

          <Text py="2">{description}</Text>
          {tags && tags.length > 0 && (
            <HStack>
              {tags.map((tag, idx) => (
                <Tag key={`${tag}-${idx}`}>{tag}</Tag>
              ))}
            </HStack>
          )}
        </CardBody>

        <CardFooter>
          <Button
            onClick={() => {
              if (type === "PUBLIC") {
                joinGroup(ID);
              }
            }}
            aria-label={t("groups.join-group")}
            isDisabled={type === "LOCKED"}
            variant={"ghost"}
            leftIcon={type === "LOCKED" ? <FaLock /> : <FaCirclePlus />}
          >
            {type === "LOCKED"
              ? t("groups.group_is_locked")
              : t("groups.join_group")}
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};
