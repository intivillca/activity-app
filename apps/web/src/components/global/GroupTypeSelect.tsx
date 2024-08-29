import {
  HStack,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  Box,
} from "@chakra-ui/react";
import { PropsWithChildren, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GroupType } from "../../types/group";
import { MdOutlinePublic, MdPublicOff } from "react-icons/md";
import { FaLock } from "react-icons/fa";

export const GroupTypeCard = (props: PropsWithChildren<UseRadioProps>) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
        display="flex"
        alignItems={"center"}
        flexDir={"column"}
      >
        {props.children}
      </Box>
    </Box>
  );
};

interface Props {
  value: GroupType;
  onChange: (value: GroupType) => void;
}
export const GroupTypeSelect = ({ value, onChange }: Props) => {
  const { t } = useTranslation("");
  const options = useMemo(
    () => [
      {
        label: t("groups.form.type.public"),
        value: "PUBLIC",
        icon: <MdOutlinePublic />,
      },
      {
        label: t("groups.form.type.private"),
        value: "PRIVATE",
        icon: <MdPublicOff />,
      },

      {
        label: t("groups.form.type.locked"),
        value: "LOCKED",
        icon: <FaLock />,
      },
    ],
    [t]
  );

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange,
    value,
  });

  const group = getRootProps();

  return (
    <HStack {...group} w="full" justify={"center"}>
      {options.map((value) => {
        const radio = getRadioProps({ value: value.value });
        return (
          <GroupTypeCard key={value.value} {...radio}>
            {value.icon}
            {value.label}
          </GroupTypeCard>
        );
      })}
    </HStack>
  );
};
