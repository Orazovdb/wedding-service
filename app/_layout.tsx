// app/_layout.tsx
import i18n from "@/shared/i18n";
import { AuthProvider } from "@/shared/store/AuthContext";
import { ThemeProvider } from "@/shared/store/ThemeContext";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { I18nextProvider } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		"Lexend-Bold": require("@/shared/fonts/Lexend-Bold.ttf"),
		"Lexend-ExtraBold": require("@/shared/fonts/Lexend-ExtraBold.ttf"),
		"Lexend-SemiBold": require("@/shared/fonts/Lexend-SemiBold.ttf"),
		"Lexend-Regular": require("@/shared/fonts/Lexend-Regular.ttf"),
		"Lexend-ExtraLight": require("@/shared/fonts/Lexend-ExtraLight.ttf"),
		"Lexend-Thin": require("@/shared/fonts/Lexend-Thin.ttf"),
		"Lexend-Light": require("@/shared/fonts/Lexend-Light.ttf"),
		"Lexend-Medium": require("@/shared/fonts/Lexend-Medium.ttf"),
		"Lexend-Black": require("@/shared/fonts/Lexend-Black.ttf")
	});

	if (!fontsLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	return (
		<SafeAreaProvider>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider>
					<AuthProvider>
						<GestureHandlerRootView style={{ flex: 1 }}>
							<Slot />
						</GestureHandlerRootView>
					</AuthProvider>
				</ThemeProvider>
			</I18nextProvider>
		</SafeAreaProvider>
	);
}
