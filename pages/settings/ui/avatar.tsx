import IconPen from "@/shared/icons/settings/pen-icon.svg";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export const ProfileAvatar = () => {
	const { t } = useTranslation();
	return (
		<View style={styles.avatarBlock}>
			<View style={styles.avatarContent}>
				<View style={styles.avatarName}>
					<Text style={styles.avatarNameText}>Durdy</Text>
					<TouchableOpacity style={styles.avatarEditButton}>
						<IconPen />
					</TouchableOpacity>
				</View>
				<Text style={styles.avatarNameText}>Annanyýazow</Text>
				<TouchableOpacity style={styles.serviceButton}>
					<Text style={styles.serviceButtonText}>{t("addService")}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	avatarBlock: {
		flexDirection: "row",
		gap: 12,
		alignItems: "center",
		marginBottom: 24
	},
	avatar: {
		borderRadius: "50%",
		borderStyle: "dashed",
		borderColor: "#00000066",
		borderWidth: 1,
		width: 104,
		height: 104,
		alignItems: "center",
		justifyContent: "center"
	},
	avatarText: {
		marginTop: 8,
		fontFamily: "Lexend-Regular",
		fontSize: 12,
		textAlign: "center",
		textDecorationLine: "underline"
	},

	avatarContent: {},
	avatarName: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8
	},
	avatarNameText: {
		fontSize: 24,
		fontFamily: "Lexend-Medium"
	},

	avatarEditButton: {
		width: 27,
		height: 25,
		borderRadius: 4,
		backgroundColor: "#C0FFB9",
		justifyContent: "center",
		alignItems: "center"
	},
	serviceButton: {
		borderRadius: 6,
		backgroundColor: "#C0FFB9",
		height: 25,
		padding: 3,
		marginTop: 20,
		width: "77%"
	},
	serviceButtonText: {
		fontSize: 14,
		fontFamily: "Lexend-Light",
		color: "#000000",
		textDecorationLine: "underline"
	}
});
