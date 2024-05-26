import { Avatar, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Activity } from "../../types/activity";

export const ActivityLink = ({ ID, name, img }: Activity) => {
  return (
    <Tooltip label={name} placement="right">
      <Link as={RouterLink} to={`/activities/${ID}`}>
        <Avatar
          key={ID}
          name={name}
          rounded={"2xl"}
          src={img?.src}
          shadow={"md"}
          _hover={{ rounded: "md" }}
        />
      </Link>
    </Tooltip>
  );
};
