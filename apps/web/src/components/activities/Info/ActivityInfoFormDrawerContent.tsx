import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { stringToLatLng } from "../../../utils/location-utils";
import { useTranslation } from "react-i18next";
import { EditableTextArea } from "../../global/EditableTextArea";
import { AvatarInput } from "../../global/AvatarInput";
import { EditableTextField } from "../../global/EditableTextField";
import { EditableLocation } from "../../global/EditableLocation";
import { EditableDate } from "../../global/EditableDate";
import { EditableTagInput } from "../../global/EditableTags";
import { useController, useFormContext } from "react-hook-form";
import { FormActivity } from "../../../types/activity";
import { useActivityProvider } from "../ActivityCtx";
import { ActivityAttachments } from "./ActivityAttachments";

export const ActivityFormInfoDrawerContent = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<FormActivity>();
  const {
    activity: { createdAt, updatedAt },
  } = useActivityProvider();
  const { field: imgField } = useController({ control, name: "avatar" });
  const { field: nameField } = useController({ control, name: "name" });
  const { field: descField } = useController({ control, name: "description" });
  const { field: startDateField } = useController({
    control,
    name: "startDate",
  });
  const { field: endDateField } = useController({ control, name: "endDate" });
  const { field: locationField } = useController({ control, name: "location" });
  const { field: tagField } = useController({ control, name: "tags" });
  return (
    <VStack alignItems={"center"}>
      <AvatarInput
        onChange={(file) => {
          imgField.onChange(file);
        }}
        value={imgField.value}
      />
      <EditableTextField
        editableProps={{ fontSize: "xl", fontWeight: "bold" }}
        onChange={(name) => {
          nameField.onChange(name);
        }}
        value={nameField.value ?? "[GROUP_NAME]"}
      />
      <Tabs w={"full"}>
        <TabList justifyContent={"center"}>
          <Tab fontWeight={"bold"}>{t("activities.info.info")}</Tab>
          <Tab fontWeight={"bold"}>{t("activities.info.location")}</Tab>
          <Tab fontWeight={"bold"}>{t("activities.info.attachments")}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack>
              <FormControl>
                <EditableTextArea
                  label={t("activities.form.description")}
                  onChange={descField.onChange}
                  editableProps={{ width: "full", textAlign: "left" }}
                  value={descField.value ?? "[DESCRIPTION]"}
                />
                <FormErrorMessage>{""}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="startDate" fontWeight={"bold"}>
                  {t("activities.form.start_date")}
                </FormLabel>
                <EditableDate
                  value={startDateField.value}
                  onChange={startDateField.onChange}
                />
                <FormErrorMessage>{""}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="startDate" fontWeight={"bold"}>
                  {t("activities.form.end_date")}
                </FormLabel>
                <EditableDate
                  value={endDateField.value}
                  onChange={endDateField.onChange}
                />
                <FormErrorMessage>{""}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="tags" fontWeight={"bold"}>
                  {t("activities.form.tags")}
                </FormLabel>
                <EditableTagInput
                  value={tagField.value ?? []}
                  onChange={tagField.onChange}
                />
                <FormErrorMessage>{""}</FormErrorMessage>
              </FormControl>
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
            <EditableLocation
              value={stringToLatLng(locationField.value)}
              onChange={() => {}}
            />
          </TabPanel>
          <TabPanel p={0}>
            <ActivityAttachments />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
