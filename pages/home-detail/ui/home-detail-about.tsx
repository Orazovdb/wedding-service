import { Colors } from "@/constants/Colors";
import { HumanServicesByIdData } from "@/shared/api/types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";

export const HomeDetailAbout = ({
	data
}: {
	data: HumanServicesByIdData | undefined;
}) => {
	const { t } = useTranslation();
	return (
		<View style={styles.about}>
			<Text style={styles.title}>{t("aboutMe")}</Text>
			<View style={styles.row}>
				{data?.service.logo && (
					<Image source={{ uri: data?.service?.logo }} style={styles.image} />
				)}
				<View style={(styles.info, !data?.service.logo && { width: "auto" })}>
					<Text style={styles.description}>
						<Text style={{ fontFamily: "Lexend-Regular" }}>{t("hi")}</Text>,{" "}
						{data?.service?.description}
					</Text>
					<Text style={styles.meeting}>
						{t("sincerely")}, {data?.service.name}
					</Text>
				</View>
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	about: {
		marginTop: 14,
		marginBottom: 20,
		paddingHorizontal: 24
	},
	title: {
		color: "#000",
		fontSize: 14,
		fontFamily: "Lexend-Regular",
		marginBottom: 6
	},
	row: {
		flexDirection: "row"
	},
	image: {
		width: "50%",
		height: 144,
		resizeMode: "cover",
		borderRadius: 6,
		marginRight: 16,
		marginTop: 10
	},
	info: {
		width: "50%",
		justifyContent: "space-between"
	},
	description: {
		fontFamily: "Lexend-ExtraLight",
		fontSize: 14,
		color: Colors.dark.secondary,
		flex: 1
	},
	meeting: {
		fontFamily: "Lexend-Regular",
		fontSize: 14,
		color: Colors.dark.secondary
	}
});
