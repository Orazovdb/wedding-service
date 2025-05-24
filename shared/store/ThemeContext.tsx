// theme/ThemeContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Appearance } from "react-native";

export type ThemeMode = "light" | "dark" | "system";

const ThemeContext = createContext({
	mode: "light" as ThemeMode,
	setMode: (_mode: ThemeMode) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const systemColor = Appearance.getColorScheme() ?? "light";
	const [mode, setMode] = useState<ThemeMode>("system");

	const effectiveMode = mode === "system" ? systemColor : mode;

	return (
		<ThemeContext.Provider value={{ mode: effectiveMode, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useThemeMode = () => useContext(ThemeContext);
