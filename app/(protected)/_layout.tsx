// app/(protected)/_layout.tsx
import { Redirect, Stack, usePathname, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";

import CategoryIcon from "@/assets/images/navigations/category.svg";
import HomeIcon from "@/assets/images/navigations/home.svg";
import SettingsIcon from "@/assets/images/navigations/settings.svg";
import SubscribersIcon from "@/assets/images/navigations/subscribers.svg";

import { useAppTheme } from "@/shared/hooks/use-app-theme";
import { useAuth } from "@/shared/store/AuthContext";
import { t } from "i18next";
import { JSX } from "react";

const navItems: {
	path: "/home" | "/categories" | "/subscribers" | "/settings";
	icon: JSX.Element;
	label: string;
}[] = [
	{ path: "/home", icon: <HomeIcon />, label: "routes.home" },
	{
		path: "/categories",
		icon: <CategoryIcon />,
		label: "routes.categories"
	},
	{
		path: "/subscribers",
		icon: <SubscribersIcon />,
		label: t("routes.subscribers")
	},
	{ path: "/settings", icon: <SettingsIcon />, label: "routes.settings" }
];

export default function ProtectedLayout() {
	const { isLoggedIn } = useAuth();
	const pathname = usePathname();
	const router = useRouter();
	const { t } = useTranslation();
	const { colors } = useAppTheme();

	if (!isLoggedIn) return <Redirect href="/login" />;

	return (
		<SafeAreaView style={[styles.safeArea, { backgroundColor: colors.white }]}>
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "fade",
					gestureEnabled: false
				}}
			>
				<Stack.Screen
					name="home/[id]"
					options={{ animation: "slide_from_right", presentation: "card" }}
				/>
				<Stack.Screen
					name="categories/[categoryDetail]/[id]"
					options={{ animation: "slide_from_right", presentation: "card" }}
				/>

				<Stack.Screen
					name="pdf-viewer"
					options={{
						animation: "slide_from_right",
						presentation: "modal",
						title: "PDF Görnüşi"
					}}
				/>
			</Stack>

			<View
				style={[
					styles.bottomNavigation,
					{ backgroundColor: colors.white, borderTopColor: colors.secondary15 }
				]}
			>
				{navItems.map(item => {
					const isActive =
						pathname === item.path || pathname.startsWith(item.path + "/");
					return (
						<TouchableOpacity
							key={item.path}
							onPress={() => router.push(item.path)}
						>
							<View
								style={[
									styles.navContainer,
									isActive && styles.activeNavContainer
								]}
							>
								{item.icon}
							</View>
							<Text
								style={[
									styles.navItem,
									isActive && styles.activeNavItem,
									{ color: colors.secondary }
								]}
							>
								{t(item.label)}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
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
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: Platform.OS === "android" ? "center" : "flex-start",
		borderTopWidth: 1,
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
		fontFamily: "Lexend-ExtraLight"
	},
	activeNavItem: {
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
		backgroundColor: "#C0FFB9",
		borderRadius: 8,
		padding: 4
	}
});
