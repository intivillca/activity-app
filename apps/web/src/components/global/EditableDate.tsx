import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import {
  Box,
  Input,
  useColorModeValue,
  IconButton,
  Text,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck, FaPen } from "react-icons/fa";
import { parseDateishValueToInputValue, parseIsoToDate } from "./utils";
import "./style.css";
import { useTranslation } from "react-i18next";

interface Props {
  value: string | Date | null;
  onChange: (date: string | null) => void;
}
export const EditableDate = ({ value, onChange }: Props) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const date = useMemo(() => {
    if (!value) {
      return null;
    }
    if (typeof value === "string") {
      return parseIsoToDate(value);
    }
    return value;
  }, [value]);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const bgColor = useColorModeValue("white", "gray.700");
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <HStack w="full">
      {isEditing ? (
        <>
          {isMobile ? (
            <Input
              type="date"
              value={parseDateishValueToInputValue(date)}
              onChange={(e) =>
                onChange(
                  e.target.value ? new Date(e.target.value).toISOString() : null
                )
              }
              bg={bgColor}
            />
          ) : (
            <DatePicker
              wrapperClassName="datepicker"
              showTimeSelect
              selected={date}
              onBlur={() => {
                toggleEditing();
              }}
              onChange={(date) => {
                onChange(date ? date.toISOString() : null);
              }}
              customInput={
                <Input bg={bgColor} placeholder={t("form.empty")} w={"full"} />
              }
              dateFormat="yyyy-MM-dd HH:mm:ss"
            />
          )}
          <IconButton
            aria-label={t("form.save")}
            icon={<FaCheck />}
            onClick={toggleEditing}
            size={["md", "md", "sm", "sm"]}
          />
        </>
      ) : (
        <>
          <Box as={Text} bg={bgColor} cursor="pointer" onClick={toggleEditing}>
            {date?.toLocaleString() ?? t("form.empty")}
          </Box>
          <IconButton
            aria-label={t("form.edit")}
            icon={<FaPen />}
            onClick={toggleEditing}
            size={["md", "md", "sm", "sm"]}
          />
        </>
      )}
    </HStack>
  );
};
