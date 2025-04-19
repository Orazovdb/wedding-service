import { Colors } from "@/constants/Colors";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FeedbackData } from "../data";
import IconFeedBack from "./icons/feedback-icon.svg";

export const HomeDetailFeedback = () => {
	return (
		<View style={styles.feedback}>
			<FlatList
				data={FeedbackData}
				keyExtractor={item => item.id}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<View style={styles.feedbackItem}>
						<View style={styles.titleGroup}>
							<View style={styles.iconFeedback}>
								<IconFeedBack />
							</View>
							<Text style={styles.title}>{item.title}</Text>
						</View>
						{item.possibilities.map((possibility, index) => (
							<View
								key={index}
								style={[
									styles.possibility,
									index !== item.possibilities.length - 1 && { marginBottom: 6 }
								]}
							>
								<View style={styles.possibilityDot} />
								<Text style={styles.possibilityText}>{possibility}</Text>
							</View>
						))}
					</View>
				)}
			/>
		</View>
	);
};

export const styles = StyleSheet.create({
	feedback: {
		marginBottom: 28,
		paddingLeft: 24
	},

	feedbackItem: {
		padding: 6,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: Colors.dark.secondary,
		marginRight: 16,
		width: 144
	},
	titleGroup: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		marginBottom: 6
	},
	iconFeedback: {
		width: 20,
		height: 20,
		borderRadius: 20 / 2,
		backgroundColor: Colors.dark.primary,
		alignItems: "center",
		justifyContent: "center"
	},
	title: {
		fontSize: 14,
		fontFamily: "Lexend-Regular",
		color: Colors.dark.secondary
	},
	possibility: {
		flexDirection: "row",
		alignItems: "center",
		gap: 3
	},
	possibilityDot: {
		width: 5,
		height: 5,
		borderRadius: 5 / 2,
		backgroundColor: Colors.dark.secondary
	},
	possibilityText: {
		fontFamily: "Lexend-Light",
		fontSize: 12,
		color: Colors.dark.secondary,
		lineHeight: 14
	}
});
