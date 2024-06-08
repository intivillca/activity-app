import { Avatar } from "@chakra-ui/react";
import { getAvatar } from "../../../api-file-server/get-avatar";

interface Props {
  name: string;
  imgSrc?: string;
}
export const StaticAvatar = ({ name, imgSrc }: Props) => {
  return <Avatar size={"2xl"} src={getAvatar(imgSrc)} name={name} />;
};
