import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ProfileAvatar } from "./ui/avatar";
import { LanguageTabs } from "./ui/language-tabs";

export const SettingsScreen = () => {
	const [selectedLang, setSelectedLang] = useState(1);
	return (
		<ScrollView style={styles.scrollView}>
			<View style={styles.page}>
				<ProfileAvatar />
				<LanguageTabs
					selectedTab={selectedLang}
					onChangeTab={setSelectedLang}
				/>
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
		alignItems: "flex-start"
	}
});
