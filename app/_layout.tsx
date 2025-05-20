import CategoryIcon from "@/assets/images/navigations/category.svg";
import HomeIcon from "@/assets/images/navigations/home.svg";
import SettingsIcon from "@/assets/images/navigations/settings.svg";
import SubscribersIcon from "@/assets/images/navigations/subscribers.svg";
import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
	ActivityIndicator,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../store/AuthContext";

export default function Layout() {
	return (
		<SafeAreaProvider>
			<AuthProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<ProtectedRoutes />
				</GestureHandlerRootView>
			</AuthProvider>
		</SafeAreaProvider>
	);
}
function ProtectedRoutes() {
	const { isLoggedIn } = useAuth();
	const pathname = usePathname();
	const router = useRouter();

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
		<SafeAreaView style={styles.safeArea}>
			<StatusBar style="dark" backgroundColor="#fff" />
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "fade",
					gestureEnabled: false
				}}
			>
				{isLoggedIn ? (
					<>
						<Stack.Screen name="home" />
						<Stack.Screen
							name="home/[id]"
							options={{
								animation: "slide_from_bottom",
								presentation: "modal"
							}}
						/>
						<Stack.Screen name="categories" />
						<Stack.Screen
							name="categories/[id]"
							options={{
								animation: "slide_from_bottom",
								presentation: "modal"
							}}
						/>
						<Stack.Screen
							name="categories/[categories-detail]/[id]"
							options={{
								animation: "slide_from_bottom",
								presentation: "modal"
							}}
						/>
						<Stack.Screen name="subscribers" />
						<Stack.Screen name="settings" />
						<Stack.Screen name="settings/[id]" />
					</>
				) : (
					<Stack.Screen name="index" />
				)}
			</Stack>

			{isLoggedIn && (
				<View style={styles.bottomNavigation}>
					<TouchableOpacity onPress={() => router.push("/home")}>
						<View
							style={[
								styles.navContainer,
								(pathname === "/home" || pathname.startsWith("/home/")) &&
									styles.activeNavContainer
							]}
						>
							<HomeIcon />
						</View>
						<Text
							style={[
								styles.navItem,
								pathname === "/home" && styles.activeNavItem
							]}
						>
							Baş sahypa
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => router.push("/categories")}>
						<View
							style={[
								styles.navContainer,
								(pathname === "/categories" ||
									pathname.startsWith("/categories/")) &&
									styles.activeNavContainer
							]}
						>
							<CategoryIcon />
						</View>
						<Text
							style={[
								styles.navItem,
								pathname === "/categories" && styles.activeNavItem
							]}
						>
							Kategoriýalar
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => router.push("/subscribers")}>
						<View
							style={[
								styles.navContainer,
								pathname === "/subscribers" && styles.activeNavContainer
							]}
						>
							<SubscribersIcon />
						</View>
						<Text
							style={[
								styles.navItem,
								pathname === "/subscribers" && styles.activeNavItem
							]}
						>
							Agzalyklarym
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => router.push("/settings")}>
						<View
							style={[
								styles.navContainer,
								pathname === "/settings" && styles.activeNavContainer
							]}
						>
							<SettingsIcon />
						</View>
						<Text
							style={[
								styles.navItem,
								pathname === "/settings" && styles.activeNavItem
							]}
						>
							Sazlamalar
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: { flex: 1 },
	bottomNavigation: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: Platform.OS === "android" ? 65 : 80,
		backgroundColor: "#fff",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: Platform.OS === "android" ? "center" : "flex-start",
		borderTopWidth: 1,
		borderTopColor: "#ddd",
		zIndex: 10,
		borderTopLeftRadius: 14,
		borderTopRightRadius: 14,
		shadowColor: "#000",
		shadowOffset: { width: 4, height: 0 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		paddingHorizontal: 14,
		paddingTop: Platform.OS === "ios" ? 6 : 0
	},
	navItem: {
		fontSize: 12,
		fontFamily: "Lexend-ExtraLight",
		color: Colors.dark.secondary
	},

	activeNavItem: {
		fontSize: 12,
		fontFamily: "Lexend-Medium"
	},

	navContainer: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 6,
		width: 42,
		height: 33,
		marginHorizontal: "auto"
	},

	activeNavContainer: {
		backgroundColor: Colors.dark.primary,
		borderRadius: 8,
		padding: 4
	}
});
