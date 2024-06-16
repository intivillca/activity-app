import {
  format,
  formatDistanceToNow,
  isFuture,
  isToday,
  Locale,
} from "date-fns";
import hr from "date-fns/locale/hr";

export enum DateType {
  Date = "P",
  DateISO = "yyyy-MM-dd",
  DateTime = "Pp",
  DateTimeSeconds = "Ppp",
  Time = "p",
}

/**
 *
 * @param {Date | string | number | null} date - date in any format
 * @param {DateType} dateType - In what format do you want the date output
 * Import DateType enum and select Date, DateTime, DateTimeSeconds or Time
 * @returns {string} formated date (string)
 */
export const formatDate = (
  date: Date | string | number | null,
  dateType: DateType,
  locale: Locale = hr as unknown as Locale
): string => {
  if (!date) {
    return "-";
  }

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return format(dateObj, dateType, { locale });
};

export const parseDateish = (value: string): Date | null => {
  // Try to parse the string into a Date object
  const date = new Date(value);

  // Check if the resulting date is valid
  if (date instanceof Date && !Number.isNaN(date.getTime())) {
    return date;
  }

  // If the date is invalid, return null
  return null;
};

/**
 * Function that is used to get a descriptive date depending on how much time has passed
 * since a given date.
 * If an hour passed it will be a descriptive value (e.g. 2 minutes ago).
 * If more than one hour passed but its the same day it will be time (e.g. 10:30).
 * If more than one day passed it will be date and time (02.08.2022 01:48).
 *
 * @param {Date | string} date - date to format
 * @return {string} string - descriptive date | time | date and time
 */
export const getDateDescriptive = (
  date: Date | string,
  locale: Locale = hr as unknown as Locale
): string => {
  const dateObj = parseToDate(date);

  if (isToday(dateObj)) {
    if (isLastHour(dateObj)) {
      return formatDistanceToNow(dateObj, { locale });
    }

    return formatDate(date, DateType.Time);
  }

  return formatDate(date, DateType.DateTime);
};

/**
 * IMPORTANT: THIS DOES NOT CHECK IF THE DATE IS TODAY!!
 * Checks if hours from given date are within one hour from now.
 * @param {Date} date - date that you want to check
 * @returns {boolean} true | false
 */
export const isLastHour = (date: Date): boolean => {
  const today = new Date();
  const hourDiff = Math.abs(today.getHours() - date.getHours());

  return hourDiff === 0 || hourDiff === 1;
};

export const parseToDate = (date: Date | string) => {
  return typeof date === "string" ? new Date(date) : date;
};

// 2023-08-27T09:56:00+02:00
// 2023-08-27T09:56:00Z
// 2023-08-27T09:56:00

export const parseDateishValueToString = (
  date: Date | string | undefined | null,
  format:
    | "toDateString"
    | "toISOString"
    | "toLocaleDateString"
    | "toLocaleString"
    | "toLocaleTimeString"
    | "toString"
    | "toTimeString"
    | "toUTCString" = "toISOString"
): string | undefined => {
  if (date) {
    if (date instanceof Date) {
      return date[format]();
    }

    return date;
  }

  return undefined;
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

export const parseNullishDate = (date: Date | string | null): Date | null => {
  if (!date) {
    return null;
  }

  return typeof date === "string" ? new Date(date) : date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dateIsValid(date: any) {
  return date instanceof Date && !Number.isNaN(date);
}

export const dateNotInPast = (v: string) => {
  const dateish = parseDateish(v);
  if (dateish) {
    return isFuture(dateish);
  }

  return false;
};
