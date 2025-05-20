import { Colors } from "@/constants/Colors";
import { HumanServicesByIdData } from "@/shared/api/types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const HomeDetailAbout = ({
	data
}: {
	data: HumanServicesByIdData | undefined;
}) => {
	return (
		<View style={styles.about}>
			<Text style={styles.title}>Men hakynda</Text>
			<View style={styles.row}>
				<Image source={{ uri: data?.service?.logo }} style={styles.image} />
				<View style={styles.info}>
					<Text style={styles.description}>
						<Text style={{ fontFamily: "Lexend-Regular" }}>Salam</Text>,{" "}
						{data?.service?.description}
					</Text>
					<Text style={styles.meeting}>Hormatlamak bilen, {data?.service.name}</Text>
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
