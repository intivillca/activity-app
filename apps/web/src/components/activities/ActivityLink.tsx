import { Avatar, Tooltip } from "@chakra-ui/react";
import { Activity } from "../../types/activity";
import { Link } from "react-router-dom";

export const ActivityLink = ({ ID, name, img }: Activity) => {
  return (
    <Tooltip label={name} placement="right">
      <Avatar
        as={Link}
        to={`/activities/${ID}`}
        cursor={"pointer"}
        shadow={"md"}
        overflow={"hidden"}
        src={img?.src}
        name={name}
        _hover={{ transform: "scale(0.85)" }}
      />
    </Tooltip>
  );
};
