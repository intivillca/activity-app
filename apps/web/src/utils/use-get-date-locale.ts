import { hr, enUS, de } from "date-fns/locale";
import { useTranslation } from "react-i18next";

const getDateLocaleFromLocale = (locale: string) => {
  switch (locale) {
    case "hr":
      return hr;
    case "en":
      return enUS;
    case "de":
      return de;
    default:
      return hr;
  }
};

/**
 * Takes the value from i18next for the current langugae and returns the date-fns locale for
 * date formating.
 * @returns Locale
 */
export const useGetDateLocale = () => {
  const { i18n } = useTranslation();
  const locale = getDateLocaleFromLocale(i18n.language ?? "hr");

  return locale;
};
