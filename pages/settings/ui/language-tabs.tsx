import IconLanguage from "@/shared/icons/settings/language-icon.svg";
import IconTranslate from "@/shared/icons/settings/translate-icon.svg";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type props = {
	selectedTab: number;
	onChangeTab: (value: number) => void;
};

export const languages = [
	{ id: 1, icon: <IconTranslate />, title: "TKM", lang: "tm" },
	{ id: 2, icon: <IconTranslate />, title: "RUS", lang: "ru" },
	{ id: 3, icon: <IconTranslate />, title: "ENG", lang: "en" }
];

export const LanguageTabs = ({ selectedTab = 1, onChangeTab }: props) => {
	return (
		<View style={styles.languageTabs}>
			<View style={styles.titleRow}>
				<IconLanguage />
				<Text style={styles.title}>Dil</Text>
			</View>
			<View style={styles.tabs}>
				{languages.map(tab => (
					<TouchableOpacity
						key={tab.id}
						onPress={() => onChangeTab(Number(tab.id))}
						style={[
							styles.tab,
							selectedTab === Number(tab.id) ? styles.tabActive : null
						]}
					>
						{tab.icon}
						<Text style={styles.tabText}>{tab.title}</Text>
					</TouchableOpacity>
				))}
			</View>
			<View style={styles.divider} />
		</View>
	);
};

export const styles = StyleSheet.create({
	languageTabs: {
		marginBottom: 14,
		width: "100%"
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		marginBottom: 10
	},
	title: {
		fontSize: 16,
		color: "#000000",
		fontFamily: "Lexend-Regular"
	},
	tabs: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		paddingVertical: 8,
		paddingHorizontal: 24,
		borderRadius: 10,
		backgroundColor: "#0000000D",
		marginBottom: 22,
		width: "90%",
		justifyContent: "center"
	},
	tab: {
		backgroundColor: "#FFFFFF",
		borderColor: "#000000",
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 24,
		gap: 6,
		paddingHorizontal: 8
	},
	tabActive: {
		backgroundColor: "#C0FFB9"
	},
	tabText: {
		fontFamily: "Lexend-Light",
		fontSize: 14,
		color: "#000000"
	},
	divider: {
		width: "100%",
		height: 1,
		backgroundColor: "#0000004D"
	}
});
