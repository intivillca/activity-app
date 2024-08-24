import { useMemo } from "react";
import DatePicker from "react-datepicker";
import {
  Input,
  useColorModeValue,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { parseDateishValueToInputValue, parseIsoToDate } from "./utils";
import "./style.css";
import { useTranslation } from "react-i18next";

interface Props {
  value: string | Date | null;
  onChange: (date: string | null) => void;
}
export const DateInput = ({ value, onChange }: Props) => {
  const { t } = useTranslation();
  const date = useMemo(() => {
    if (!value) {
      return null;
    }
    if (typeof value === "string") {
      return parseIsoToDate(value);
    }
    return value;
  }, [value]);

  const bgColor = useColorModeValue("white", "gray.700");
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <HStack w="full">
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
          onChange={(date) => {
            onChange(date ? date.toISOString() : null);
          }}
          customInput={
            <Input bg={bgColor} placeholder={t("form.empty")} w={"full"} />
          }
          dateFormat="yyyy-MM-dd HH:mm:ss"
        />
      )}
    </HStack>
  );
};
