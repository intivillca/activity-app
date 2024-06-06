import { parseISO } from "date-fns";

export function parseIsoToDate(
  isoString: string | null | undefined
): Date | null {
  if (!isoString) {
    return null;
  }

  return parseISO(isoString);
}

export const parseNullishDate = (date: Date | string | null): Date | null => {
  if (!date) {
    return null;
  }

  return typeof date === 'string' ? new Date(date) : date;
};

export const parseDateishValueToInputValue = (
  date: Date | string | undefined | null
): string | undefined => {
  if (date) {
    if (date instanceof Date) {
      return formatToCorrectValue(date);
    }
    const formatToDate = parseNullishDate(date);
    if (formatToDate) {
      return formatToCorrectValue(formatToDate);
    }

    return undefined;
  }

  return undefined;
};
const formatToCorrectValue = (date: Date): string => {
  const tzOffset = new Date().getTimezoneOffset();
  // getTimezoneOffset returns minutes
  // multiplty by (60 seconds * 1000 miliseconds) to get miliseconds
  const tzOffsetMS = tzOffset * 60000;

  const dateInLocalTz = new Date(date.getTime() - tzOffsetMS);
  // Remove trailing "Z" and optional miliseconds (eg .000Z)
  const isoNoTz = dateInLocalTz.toISOString().replace(/(\.\d+)?Z$/, "");

  return isoNoTz;
};
