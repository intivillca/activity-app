import { Avatar } from "@chakra-ui/react";

interface Props {
  name: string;
  imgSrc?: string;
}
export const StaticAvatar = ({ name, imgSrc }: Props) => {
  return <Avatar size={"2xl"} src={imgSrc} name={name} />;
};
