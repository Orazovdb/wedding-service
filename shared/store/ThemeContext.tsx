import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

export type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "app:theme-mode";

const ThemeContext = createContext({
	mode: "light" as ThemeMode,
	setMode: (_mode: ThemeMode) => {}
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const systemColor = Appearance.getColorScheme() ?? "light";
	const [mode, setModeState] = useState<ThemeMode>("system");

	const effectiveMode = mode === "system" ? systemColor : mode;

	useEffect(() => {
		AsyncStorage.getItem(STORAGE_KEY).then(stored => {
			if (stored === "light" || stored === "dark" || stored === "system") {
				setModeState(stored);
			}
		});
	}, []);

	const setMode = async (newMode: ThemeMode) => {
		setModeState(newMode);
		await AsyncStorage.setItem(STORAGE_KEY, newMode);
	};

	return (
		<ThemeContext.Provider value={{ mode: effectiveMode, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useThemeMode = () => useContext(ThemeContext);
