import {
  Card,
  Avatar,
  Stack,
  CardBody,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getMediumImg } from "../../../api-file-server/get-medium-img";
import { GlobalMessage } from "../../../types/global-message";
import { ChatMessageDate } from "./GlobalMessageDescriptiveDate";

export const GlobalMessageC = ({
  activity,
  group,
  ID,
  content,
  createdAt,
  senderID,
  updatedAt,
}: GlobalMessage) => {
  const activityOrGroup = activity ?? group;
  const type = group ? "groups" : "activities";
  if (!activityOrGroup) {
    throw Error("Message has neither activity nor group");
  }
  return (
    <Card
      as={Link}
      to={`/${type}/${activityOrGroup.ID}/chat`}
      w="full"
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      alignItems={"center"}
      px={4}
    >
      <Avatar
        size={"lg"}
        name={activityOrGroup.name}
        src={getMediumImg(activityOrGroup?.avatar?.src)}
      />
      <Stack>
        <CardBody>
          <HStack w="full">
            <Heading size="md">{activityOrGroup.name}</Heading>
            <ChatMessageDate updatedAt={updatedAt} />
          </HStack>

          <Text py="2">{content}</Text>
        </CardBody>
      </Stack>
    </Card>
  );
};
