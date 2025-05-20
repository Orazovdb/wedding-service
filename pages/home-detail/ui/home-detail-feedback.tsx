import { Colors } from "@/constants/Colors";
import { HumanServicesByIdData } from "@/shared/api/types";
import IconAlarm from "@/shared/icons/alarm-icon.svg";
import IconHeadphones from "@/shared/icons/headphones.svg";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import IconFeedBack from "./icons/feedback-icon.svg";

export const HomeDetailFeedback = ({
	data
}: {
	data: HumanServicesByIdData | undefined;
}) => {
	return (
		<View style={styles.feedback}>
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
				<View style={styles.feedbackItem}>
					<View style={styles.titleGroup}>
						<View style={styles.iconFeedback}>
							<IconFeedBack />
						</View>
						<Text style={styles.title}>Bahalandyrma</Text>
					</View>
					{data?.service.pricing.map((price, index) => (
						<View
							key={index}
							style={[
								styles.possibility,
								index !== data.service.pricing.length - 1 && {
									marginBottom: 6
								}
							]}
						>
							<View style={styles.possibilityDot} />
							<Text style={styles.possibilityText}>{price}</Text>
						</View>
					))}
				</View>
				<View style={styles.feedbackItem}>
					<View style={styles.titleGroup}>
						<View style={styles.iconFeedback}>
							<IconAlarm />
						</View>
						<Text style={styles.title}>Bronlamak üçin </Text>
					</View>
					{data?.service.booking.map((alarm, index) => (
						<View
							key={index}
							style={[
								styles.possibility,
								index !== data.service.booking.length - 1 && {
									marginBottom: 6
								}
							]}
						>
							<View style={styles.possibilityDot} />
							<Text style={styles.possibilityText}>{alarm}</Text>
						</View>
					))}
				</View>
				<View style={styles.feedbackItem}>
					<View style={styles.titleGroup}>
						<View style={styles.iconFeedback}>
							<IconHeadphones />
						</View>
						<Text style={styles.title}>Habarlaşmak</Text>
					</View>
					{data?.service.contacts.map((contact, index) => (
						<View
							key={index}
							style={[
								styles.possibility,
								index !== data?.service.contacts.length - 1 && {
									marginBottom: 6
								}
							]}
						>
							<View style={styles.possibilityDot} />
							<Text style={styles.possibilityText}>{contact}</Text>
						</View>
					))}
				</View>
			</ScrollView>
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
