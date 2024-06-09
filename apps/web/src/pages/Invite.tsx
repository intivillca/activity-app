import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAvatar } from "../api-file-server/get-avatar";
import { handleInvite } from "../api/invites/handleInvite";

export const Invite = () => {
  const { ID } = useParams<{ ID: string }>();
  if (!ID) {
    throw Error("Missing ID");
  }
  const navigate = useNavigate();
  const { data: inviteData } = useQuery({
    queryFn: () => handleInvite(ID),
    queryKey: ["Invite", ID],
  });

  if (!inviteData) {
    return <Spinner />;
  }

  return (
    <Center>
      <Card>
        <CardHeader>
          <Center>
            <AvatarGroup size={"lg"}>
              {inviteData.group && (
                <Avatar
                  size={"lg"}
                  src={getAvatar(inviteData.group.avatar?.src)}
                  name={inviteData.group.name}
                />
              )}
              <Avatar
                size={"lg"}
                src={getAvatar(inviteData.activity.avatar?.src)}
                name={inviteData.activity.name}
              />
            </AvatarGroup>
          </Center>
        </CardHeader>
        <CardBody>
          {"You joined"}
          {inviteData.activity.name}-{inviteData.group?.name ?? ""}
        </CardBody>
        <CardFooter>
          <Button
            onClick={() => {
              navigate(`/activity/${inviteData.activity.ID}`);
            }}
          >
            {"Go to group"}
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
};
