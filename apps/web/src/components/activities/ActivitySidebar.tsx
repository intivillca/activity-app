import { AspectRatio, Box, VStack, Image, Text } from "@chakra-ui/react";
import { useActivityProvider } from "./ActivityCtx";
import { useTranslation } from "react-i18next";
import { getMediumImg } from "../../api-file-server/get-medium-img";

export const ActivitySidebar = () => {
  const {
    activity: { description, name, avatar },
  } = useActivityProvider();

  const { t } = useTranslation("");
  return (
    <VStack flex={"1 1 auto"} w="full" overflow={"hidden"} spacing={0}>
      <Box
        h={"64px"}
        flex={"0 1 64px"}
        bg={"gray.700"}
        w="full"
        color={"white"}
        p={4}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        fontSize={"xl"}
      >
        {name}
      </Box>
      <VStack flex={"1 1 auto"} w="full" overflowY={"auto"}>
        {avatar && (
          <AspectRatio ratio={[1, 1, 4 / 3, 16 / 9]} w="full">
            <Image
              objectFit="cover"
              src={getMediumImg(avatar.src)}
              overflow={"hidden"}
            />
          </AspectRatio>
        )}
        <VStack w="full" alignItems={"flex-start"} p={4}>
          <Text fontWeight={"bold"}>{t("description")}</Text>
          <Box>{description}</Box>
        </VStack>
      </VStack>
    </VStack>
  );
};
