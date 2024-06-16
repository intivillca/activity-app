import { isToday } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { parseToDate, getDateDescriptive, isLastHour } from "./date-utils";
import { useGetDateLocale } from "./use-get-date-locale";

/**
 * This hook is used to refresh the time that has passed since a given date
 * in a descriptive format (e.g. 10 minutes ago).
 * It will only update dates that are today and in last hour.
 * Other dates will be only be formated, with rules mentioned below.
 * Todays date will be formated to only time e.g. 10:30.
 * Other dates will be displayed with full date time e.g. 11.08.2022. 08:00
 * @param {Date | string} date - Value from when to refresh.
 * @param {number} [refreshInterval=30000] - How often is the value updated in ms.
 * Defaults to 30s (30000ms).
 * @returns {string} descriptive value | time | date and time
 */
export const useRefreshDate = (
  date: string | Date,
  refreshInterval = 30000
) => {
  const parsedDate = useMemo(() => parseToDate(date), [date]);
  const locale = useGetDateLocale();
  const [descriptiveDate, setDescriptiveDate] = useState<string>(
    getDateDescriptive(parsedDate, locale)
  );
  const timer = useRef<number>();
  useEffect(() => {
    setDescriptiveDate(getDateDescriptive(parsedDate, locale));
  }, [locale, parsedDate]);
  useEffect(() => {
    if (isToday(parsedDate) && isLastHour(parsedDate)) {
      timer.current = window.setInterval(() => {
        setDescriptiveDate(getDateDescriptive(parsedDate, locale));
      }, refreshInterval);
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = undefined;
      }
    };
  }, [descriptiveDate, parsedDate, refreshInterval, locale]);

  return { descriptiveDate };
};
