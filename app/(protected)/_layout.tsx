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

import IconCategoryDark from "@/assets/images/navigations/category-dark.svg";
import IconCategory from "@/assets/images/navigations/category.svg";
import HomeIconDark from "@/assets/images/navigations/home-dark.svg";
import HomeIcon from "@/assets/images/navigations/home.svg";
import SettingsIconDark from "@/assets/images/navigations/settings-dark.svg";
import SettingsIcon from "@/assets/images/navigations/settings.svg";
import SubscribersIconDark from "@/assets/images/navigations/subscribers-dark.svg";
import SubscribersIcon from "@/assets/images/navigations/subscribers.svg";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import { useAuth } from "@/shared/store/AuthContext";
import { useThemeMode } from "@/shared/store/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { JSX } from "react";

const navItems: {
	path: "/home" | "/categories" | "/subscribers" | "/settings";
	icon: JSX.Element;
	darkIcon: JSX.Element;
	label: string;
}[] = [
	{
		path: "/home",
		icon: <HomeIcon />,
		darkIcon: <HomeIconDark />,
		label: "routes.home"
	},
	{
		path: "/categories",
		icon: <IconCategory />,
		darkIcon: <IconCategoryDark />,
		label: "routes.categories"
	},
	{
		path: "/subscribers",
		icon: <SubscribersIcon />,
		darkIcon: <SubscribersIconDark />,
		label: "routes.subscribers"
	},
	{
		path: "/settings",
		icon: <SettingsIcon />,
		darkIcon: <SettingsIconDark />,
		label: "routes.settings"
	}
];

export default function ProtectedLayout() {
	const { isLoggedIn } = useAuth();
	const pathname = usePathname();
	const router = useRouter();
	const { t } = useTranslation();
	const { colors } = useAppTheme();
	const { mode } = useThemeMode();

	if (!isLoggedIn) return <Redirect href="/login" />;

	return (
		<SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bgPage }]}>
			{mode === "light" ? (
				<StatusBar style="dark" translucent={false} />
			) : (
				<StatusBar style="light" translucent={false} />
			)}

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
					name="settings/settings-info"
					options={{ animation: "slide_from_right", presentation: "card" }}
				/>

				<Stack.Screen
					name="settings/provided-services"
					options={{ animation: "slide_from_right", presentation: "card" }}
				/>

				<Stack.Screen
					name="pdf-viewer"
					options={{
						animation: "fade",
						presentation: "modal",
						title: "PDF Görnüşi"
					}}
				/>
			</Stack>

			<View
				style={[
					styles.bottomNavigation,
					{
						backgroundColor: colors.navBg,
						borderTopColor: colors.navBorder,
						shadowColor: colors.navBorder
					}
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
								{mode === "light"
									? isActive
										? item.icon
										: item.icon
									: isActive
									? item.icon
									: item.darkIcon}
							</View>
							<Text
								style={[
									styles.navItem,
									isActive && styles.activeNavItem,
									{ color: colors.text }
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
	safeArea: { flex: 1, paddingTop: Platform.OS === "android" ? 40 : 0 },
	bottomNavigation: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: Platform.OS === "android" ? 90 : 80,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: Platform.OS === "android" ? "center" : "flex-start",
		borderTopWidth: 1,
		zIndex: 10,
		borderTopLeftRadius: 14,
		borderTopRightRadius: 14,
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
