import { Colors } from "@/constants/Colors";
import IconCall from "@/shared/icons/call-icon.svg";
import IconDownload from "@/shared/icons/download-icon.svg";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const HomeDetailContact = () => {
	return (
		<View style={styles.contact}>
			<TouchableOpacity style={styles.callButton}>
				<IconCall />
				<Text style={styles.callButtonText}>JAŇ ET</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.catalogButton}>
				<Text style={styles.catalogButtonText}>Katalog</Text>
				<IconDownload />
			</TouchableOpacity>
		</View>
	);
};

export const styles = StyleSheet.create({
	contact: {
		paddingVertical: 16,
		paddingHorizontal: 24,
		flexDirection: "row",
		justifyContent: "space-between",
		borderColor: "#BFBFBF",
		borderTopWidth: 1,
		borderBottomWidth: 1
	},
	callButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: Colors.dark.secondary,
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		backgroundColor: Colors.dark.primary,
		flex: 1,
		marginRight: 16
	},
	callButtonText: {
		fontSize: 16,
		fontFamily: "Lexend-Bold"
	},
	catalogButton: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: Colors.dark.secondary,
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingVertical: 4,
		paddingHorizontal: 8
	},
	catalogButtonText: {
		fontSize: 12,
		fontFamily: "Lexend-Regular",
		color: Colors.dark.secondary
	}
});
