import { Colors } from "@/constants/Colors";
import IconAd from "@/shared/icons/settings/ad-icon.svg";
import IconLogout from "@/shared/icons/settings/logout-icon.svg";
import IconRocket from "@/shared/icons/settings/rocket-icon.svg";
import { useAuth } from "@/store/AuthContext";
import React, { useState } from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { ProfileAvatar } from "./ui/avatar";
import { LanguageTabs } from "./ui/language-tabs";
import { ThemeTabs } from "./ui/theme-tabs";

export const SettingsScreen = () => {
	const [selectedLang, setSelectedLang] = useState(1);
	const [selectedTheme, setSelectedTheme] = useState(1);

	const { logout } = useAuth();
	

	return (
		<ScrollView style={styles.scrollView}>
			<View style={styles.page}>
				<ProfileAvatar />
				<LanguageTabs
					selectedTab={selectedLang}
					onChangeTab={setSelectedLang}
				/>
				<ThemeTabs selectedTab={selectedTheme} onChangeTab={setSelectedTheme} />
				<View style={styles.routes}>
					<View style={styles.routeItemWrapper}>
						<TouchableOpacity style={styles.routeItem}>
							<IconRocket />
							<Text style={styles.routeItemText}>Biz hakynda</Text>
						</TouchableOpacity>
						<View style={styles.routeDivider} />
					</View>
					<View style={styles.routeItemWrapper}>
						<TouchableOpacity style={styles.routeItem}>
							<IconAd />
							<Text style={styles.routeItemText}>Mahabat hyzmatlary</Text>
						</TouchableOpacity>
						<View style={styles.routeDivider} />
					</View>
				</View>
				<TouchableOpacity onPress={logout} style={styles.logoutButton}>
					<Text style={styles.logoutButtonText}>Ulgamda cyk</Text>
					<IconLogout />
				</TouchableOpacity>
				<View style={styles.gratitude}>
					<View style={styles.content}>
						<Text style={styles.gratitudeText}>
							Programmamyzy ýükläp ullananyňyz we biziň bilen işleşeniňiz üçin
							Sagboluň. Hormatlamak bilen,
						</Text>
						<Text style={styles.gratitudeTitle}>Toý hyzmatlary</Text>
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
		backgroundColor: Colors.light.white,
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
