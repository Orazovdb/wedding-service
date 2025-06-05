import { useAppTheme } from "@/shared/hooks/use-app-theme";
import IconDarkDark from "@/shared/icons/settings/dark-icon-dark.svg";
import IconDark from "@/shared/icons/settings/dark-icon.svg";
import IconDevice from "@/shared/icons/settings/device-icon.svg";
import IconLightDark from "@/shared/icons/settings/light-icon-dark.svg";
import IconLight from "@/shared/icons/settings/light-icon.svg";
import IconSystemDark from "@/shared/icons/settings/system-icon-dark.svg";
import IconSystem from "@/shared/icons/settings/system-icon.svg";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type props = {
	selectedTab: number;
	onChangeTab: (value: number) => void;
};

export const ThemeTabs = ({ selectedTab = 1, onChangeTab }: props) => {
	const { t } = useTranslation();
	const { colors, mode } = useAppTheme();

	const data = [
		{
			id: "1",
			icon:
				mode === "light" ? (
					<IconLight />
				) : selectedTab === 1 ? (
					<IconLight />
				) : (
					<IconLightDark />
				),
			title: "Light"
		},
		{
			id: "2",
			icon:
				mode === "light" ? (
					<IconDark />
				) : selectedTab === 2 ? (
					<IconDark />
				) : (
					<IconDarkDark />
				),
			title: "Dark"
		},
		{
			id: "3",
			icon:
				mode === "light" ? (
					<IconSystem />
				) : selectedTab === 3 ? (
					<IconSystem />
				) : (
					<IconSystemDark />
				),
			title: "System"
		}
	];

	return (
		<View style={styles.ThemeTabs}>
			<View style={styles.titleRow}>
				<IconDevice />
				<Text style={[styles.title, { color: colors.text }]}>{t("theme")}</Text>
			</View>
			<View style={styles.tabs}>
				{data.map(tab => {
					const isActive = selectedTab === Number(tab.id);
					return (
						<TouchableOpacity
							key={tab.id}
							onPress={() => onChangeTab(Number(tab.id))}
							style={[
								styles.tab,
								{ backgroundColor: colors.textReverse },
								isActive ? styles.tabActive : null
							]}
						>
							{tab.icon}
							<Text
								style={[
									styles.tabText,
									{
										color: isActive
											? mode === "light"
												? colors.text
												: colors.textReverse
											: colors.text
									}
								]}
							>
								{tab.title}
							</Text>
						</TouchableOpacity>
					);
				})}
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
