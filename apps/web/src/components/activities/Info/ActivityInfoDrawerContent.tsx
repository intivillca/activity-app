import {
  Box,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  VStack,
} from "@chakra-ui/react";
import { stringToLatLng } from "../../../utils/location-utils";
import { useTranslation } from "react-i18next";
import { useActivityProvider } from "../ActivityCtx";
import { StaticAvatar } from "../../global/Static/StaticAvatar";
import { LocationDisplay } from "../../global/LocationStatic";
import { useMemo } from "react";
import { parseIsoToDate } from "../../global/utils";
import { ActivityAttachments } from "./ActivityAttachments";

export const ActivityInfoDrawerContent = () => {
  const { t } = useTranslation();
  const {
    activity: {
      description,
      name,
      startDate,
      endDate,
      location,
      tags,
      avatar,
      createdAt,
      updatedAt,
    },
  } = useActivityProvider();

  const endDateF = useMemo(() => {
    if (!endDate) {
      return null;
    }
    if (typeof endDate === "string") {
      return parseIsoToDate(endDate);
    }
    return endDate;
  }, [endDate]);
  const startDateF = useMemo(() => {
    if (!startDate) {
      return null;
    }
    if (typeof startDate === "string") {
      return parseIsoToDate(startDate);
    }
    return startDate;
  }, [startDate]);

  return (
    <VStack alignItems={"center"} p={0}>
      <StaticAvatar imgSrc={avatar?.src} name={name} />
      <Box fontSize={"xl"} fontWeight={"bold"}>
        {name}
      </Box>
      <Tabs w={"full"}>
        <TabList justifyContent={"center"}>
          <Tab fontWeight={"bold"}>{t("activities.info.info")}</Tab>
          <Tab fontWeight={"bold"}>{t("activities.info.location")}</Tab>
          <Tab fontWeight={"bold"}>{t("activities.info.attachments")}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack>
              <VStack w="full">
                <Box fontWeight={"bold"} w="full">
                  {t("activities.form.description")}
                </Box>
                <Box w="full">{description}</Box>
              </VStack>
              <VStack w="full">
                <Box fontWeight={"bold"} w="full">
                  {t("activities.form.start_date")}
                </Box>
                <Box w="full">
                  {startDateF?.toLocaleString() ?? t("form.empty")}
                </Box>
              </VStack>
              <VStack w="full">
                <Box fontWeight={"bold"} w="full">
                  {t("activities.form.end_date")}
                </Box>
                <Box w="full">
                  {endDateF?.toLocaleString() ?? t("form.empty")}
                </Box>
              </VStack>
              <VStack w="full">
                <Box fontWeight={"bold"} w="full">
                  {t("activities.form.tags")}
                </Box>
                <Stack direction="row" mt={2} spacing={2} w="full">
                  {tags.map((tag, index) => (
                    <Tag
                      key={index}
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="gray"
                    >
                      {tag}
                    </Tag>
                  ))}
                </Stack>
              </VStack>
              <VStack w="full">
                <Box fontWeight={"bold"} w="full">
                  {t("crud.created_at")}
                </Box>
                <Box w="full">{createdAt ?? t("form.empty")}</Box>
              </VStack>
              <VStack w="full">
                <Box fontWeight={"bold"} w="full">
                  {t("crud.updated_at")}
                </Box>
                <Box w="full">{updatedAt ?? t("form.empty")}</Box>
              </VStack>
            </VStack>
          </TabPanel>
          <TabPanel p={0}>
            <LocationDisplay location={stringToLatLng(location)} />
          </TabPanel>
          <TabPanel p={0}>
            <ActivityAttachments />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
