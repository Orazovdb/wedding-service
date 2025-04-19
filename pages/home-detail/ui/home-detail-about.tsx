import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const HomeDetailAbout = () => {
	return (
		<View style={styles.about}>
			<Text style={styles.title}>Men hakynda</Text>
			<View style={styles.row}>
				<Image
					source={require("@/shared/images/login/slider-1.png")}
					style={styles.image}
				/>
				<View style={styles.info}>
					<Text style={styles.description}>
						<Text style={{ fontFamily: "Lexend-Regular" }}>Salam</Text>, ipsum
						dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim
						veniam.
					</Text>
					<Text style={styles.meeting}>Hormatlamak bilen, Mark</Text>
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
