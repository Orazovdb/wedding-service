import { getIsServiceProvider } from "@/shared/api/services/auth-token.service";
import { profileService } from "@/shared/api/services/profile.service";
import { settingsService } from "@/shared/api/services/settings.service";
import { Profile, ProvidedServices } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import i18n from "@/shared/i18n";
import IconAd from "@/shared/icons/settings/ad-icon.svg";
import IconLogout from "@/shared/icons/settings/logout-icon.svg";
import { useAuth } from "@/shared/store/AuthContext";
import { useThemeMode } from "@/shared/store/ThemeContext";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Alert,
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { ProfileAvatar } from "./ui/avatar";
import { languages, LanguageTabs } from "./ui/language-tabs";
import { ThemeTabs } from "./ui/theme-tabs";

export const SettingsScreen = () => {
	const { t } = useTranslation();
	const { colors } = useAppTheme();
	const currentLang = i18n.language;
	const [isProvided, setIsProvided] = useState<boolean | null>(null);

	const [selectedLang, setSelectedLang] = useState(1);
	const { mode, setMode } = useThemeMode();
	const [selectedTheme, setSelectedTheme] = useState(1);
	const [profile, setProfile] = useState<Profile>();
	const [providedServices, setProvidedServices] = useState<ProvidedServices>();

	const { logout } = useAuth();

	useEffect(() => {
		const fetchData = async () => {
			const response = await profileService.getProfile();
			setProfile(response);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const response = await settingsService.getProvidedServices({
				params: { lang: currentLang }
			});
			setProvidedServices(response);
		};
		fetchData();
	}, []);

	const handleChangeTab = (id: number) => {
		setSelectedLang(id);
		const selected = languages.find(d => d.id === id);
		if (selected) {
			i18n.changeLanguage(selected.lang);
		}
	};

	useEffect(() => {
		const currentLang = i18n.language;
		const initialLang = languages.find(lang => lang.lang === currentLang);
		if (initialLang) {
			setSelectedLang(initialLang.id);
		}

		if (mode) {
			const themeMap: Record<string, number> = {
				light: 1,
				dark: 2,
				system: 3
			};
			setSelectedTheme(themeMap[mode] || 3);
		}
	}, [mode]);

	const handleChangeThemeTab = (value: number) => {
		setSelectedTheme(value);
		const theme =
			value === 1
				? "light"
				: value === 2
				? "dark"
				: value === 3
				? "system"
				: "system";
		setMode(theme);
	};

	const refetch = async () => {
		const response = await profileService.getProfile();
		setProfile(response);
	};

	const handleCall = (phone?: string) => {
		if (!phone) return;
		const formattedPhoneNumber = `tel:+993${phone}`;
		Linking.canOpenURL(formattedPhoneNumber)
			.then(supported => {
				if (!supported) {
					Alert.alert(
						"Telefon açylyp bilinmedi",
						`Telefon belgisi: +993${phone}`
					);
				} else {
					Linking.openURL(formattedPhoneNumber);
				}
			})
			.catch(err => console.error("Call error:", err));
	};

	useEffect(() => {
		const load = async () => {
			const isProvided = await getIsServiceProvider();
			setIsProvided(isProvided);
		};
		load();
	}, []);

	return (
		<ScrollView style={[styles.scrollView, { backgroundColor: colors.bgPage }]}>
			<View style={styles.page}>
				<ProfileAvatar
					data={profile}
					refetch={refetch}
					isProvided={isProvided}
					providedServices={providedServices}
				/>
				<LanguageTabs
					selectedTab={selectedLang}
					onChangeTab={handleChangeTab}
				/>
				<ThemeTabs
					selectedTab={selectedTheme}
					onChangeTab={handleChangeThemeTab}
				/>
				<View style={styles.routes}>
					{/* <View style={styles.routeItemWrapper}>
						<TouchableOpacity style={styles.routeItem}>
							<IconRocket />
							<Text style={[styles.routeItemText, { color: colors.text }]}>
								Biz hakynda
							</Text>
						</TouchableOpacity>
						<View style={styles.routeDivider} />
					</View> */}
					<View style={styles.routeItemWrapper}>
						<TouchableOpacity
							onPress={() => handleCall(profile?.data.phone)}
							style={styles.routeItem}
						>
							<IconAd />
							<Text style={[styles.routeItemText, { color: colors.text }]}>
								{t("adService")}
							</Text>
						</TouchableOpacity>
						<View style={styles.routeDivider} />
					</View>
				</View>
				<TouchableOpacity onPress={logout} style={styles.logoutButton}>
					<Text style={styles.logoutButtonText}>{t("logout")}</Text>
					<IconLogout />
				</TouchableOpacity>
				<View style={styles.gratitude}>
					<View style={styles.content}>
						<Text style={[styles.gratitudeText, { color: colors.text }]}>
							{t("recommendApp")}
						</Text>
						<Text style={[styles.gratitudeTitle, { color: colors.text }]}>
							{profile?.data.name}
						</Text>
					</View>
					<Image
						source={require("@/shared/images/settings-person.png")}
						style={{ marginLeft: "auto" }}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

export const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		paddingVertical: 30,
		paddingHorizontal: 34
	},
	page: {
		alignItems: "flex-start",
		paddingBottom: 80
	},
	routes: {
		gap: 14,
		width: "100%",
		marginBottom: 18
	},
	routeItemWrapper: {
		paddingBottom: 18
	},
	routeItem: {
		flexDirection: "row",
		gap: 6,
		marginBottom: 20
	},
	routeItemText: {
		fontSize: 16,
		color: "#000",
		fontFamily: "Lexend-Regular",
		textDecorationLine: "underline"
	},
	routeDivider: {
		width: "100%",
		height: 1,
		backgroundColor: "#0000004D"
	},

	logoutButton: {
		backgroundColor: "#FFD2CF",
		height: 25,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 14.5,
		borderRadius: 6,
		gap: 10,
		marginBottom: 20
	},
	logoutButtonText: {
		fontSize: 16,
		fontFamily: "Lexend-Light",
		color: "#000000"
	},

	gratitude: {
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 10,
		backgroundColor: "#0000000D",
		width: "100%"
	},
	content: {},
	gratitudeText: {
		fontSize: 14,
		lineHeight: 21,
		fontFamily: "Lexend-Light",
		color: "#000000",
		marginBottom: 20,
		width: "85%"
	},
	gratitudeTitle: {
		fontSize: 14,
		fontFamily: "Lexend-Medium",
		color: "#000000"
	}
});
