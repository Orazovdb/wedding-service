// theme/useAppTheme.ts
import { Colors } from "@/constants/Colors";
import { useThemeMode } from "../store/ThemeContext";

export const useAppTheme = () => {
	const { mode } = useThemeMode();
	const colors = Colors[mode as keyof typeof Colors];
	return { mode, colors };
};
