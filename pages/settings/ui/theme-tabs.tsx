import IconDark from "@/shared/icons/settings/dark-icon.svg";
import IconDevice from "@/shared/icons/settings/device-icon.svg";
import IconLight from "@/shared/icons/settings/light-icon.svg";
import IconSystem from "@/shared/icons/settings/system-icon.svg";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type props = {
	selectedTab: number;
	onChangeTab: (value: number) => void;
};

const data = [
	{
		id: "1",
		icon: <IconLight />,
		title: "Light"
	},
	{
		id: "2",
		icon: <IconDark />,
		title: "Dark"
	},
	{
		id: "3",
		icon: <IconSystem />,
		title: "System"
	}
];

export const ThemeTabs = ({ selectedTab = 1, onChangeTab }: props) => {
	return (
		<View style={styles.ThemeTabs}>
			<View style={styles.titleRow}>
				<IconDevice />
				<Text style={styles.title}>Ekran</Text>
			</View>
			<View style={styles.tabs}>
				{data.map(tab => (
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
	ThemeTabs: {
		width: "100%",
		marginBottom: 22
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
		width: "90%",
		marginBottom: 22,
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
