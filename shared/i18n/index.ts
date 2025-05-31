// shared/i18n/index.ts
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import tk from "./locales/tk.json";

i18n.use(initReactI18next).init({
	lng: Localization.getLocales()[0]?.languageCode ?? "en",
	fallbackLng: "en",
	resources: {
		en: { translation: en },
		tk: { translation: tk },
		ru: { translation: ru }
	},
	interpolation: {
		escapeValue: false
	}
});

export default i18n;
