import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ar from "./ar.json";
import * as Localization from "expo-localization";
import { I18nManager } from "react-native";
import moment from "moment";

let lang;
const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  compatibilityJSON: "v3",
  interpolation: {
    format: function (value, format, lng) {
      if (value instanceof Date)
        return moment(value).format(format);
      return value;
    },
  },
  fallbackLng: "en",
});

const bootstrapAsync = async () => {
  let locale = Localization.locale;
  if (locale.includes("ar")) {
    lang = "ar";
    await I18nManager.forceRTL(true);
  } else {
    lang = "en";
    await I18nManager.forceRTL(false);
  }

  i18n.changeLanguage(lang);
};

bootstrapAsync();
export default i18n;
