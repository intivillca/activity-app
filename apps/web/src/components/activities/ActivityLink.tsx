import { Avatar, Tooltip } from "@chakra-ui/react";
import { Activity } from "../../types/activity";
import { Link } from "react-router-dom";
import { getAvatar } from "../../api-file-server/get-avatar";

export const ActivityLink = ({ ID, name, avatar }: Activity) => {
  return (
    <Tooltip label={name} placement="right">
      <Avatar
        as={Link}
        to={`/activities/${ID}`}
        cursor={"pointer"}
        shadow={"md"}
        overflow={"hidden"}
        src={getAvatar(avatar?.src)}
        name={name}
        _hover={{ transform: "scale(0.85)" }}
      />
    </Tooltip>
  );
};
