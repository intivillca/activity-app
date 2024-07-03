import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ActivityFiles } from "./ActivityFiles";
import { ActivityImages } from "./ActivityImages";

export const ActivityAttachments = () => {
  const { t } = useTranslation();
  return (
    <Tabs>
      <TabList>
        <Tab>{t("activities.info.images")}</Tab>
        <Tab>{t("activities.info.files")}</Tab>
      </TabList>

      <TabPanels>
        <TabPanel p={0}>
          <ActivityImages />
        </TabPanel>
        <TabPanel>
          <ActivityFiles />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
