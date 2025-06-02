import { Colors } from "@/constants/Colors";
import { HumanServicesByIdData } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import IconAlarm from "@/shared/icons/alarm-icon.svg";
import IconHeadphones from "@/shared/icons/headphones.svg";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import IconFeedBack from "./icons/feedback-icon.svg";

export const HomeDetailFeedback = ({
	data
}: {
	data: HumanServicesByIdData | undefined;
}) => {
	const { t } = useTranslation();
	const { colors, mode } = useAppTheme();

	return (
		<View style={styles.feedback}>
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
				{data?.service.pricing[0] !== "" ? (
					<View style={[styles.feedbackItem, { borderColor: colors.text }]}>
						<View style={styles.titleGroup}>
							<View style={styles.iconFeedback}>
								<IconFeedBack />
							</View>
							<Text style={[styles.title, { color: colors.text }]}>
								{t("evaluation")}
							</Text>
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
								<View
									style={[
										styles.possibilityDot,
										{ backgroundColor: colors.text }
									]}
								/>
								<Text style={[styles.possibilityText, { color: colors.text }]}>
									{price}
								</Text>
							</View>
						))}
					</View>
				) : null}
				{data?.service.booking[0] !== "" ? (
					<View style={[styles.feedbackItem, { borderColor: colors.text }]}>
						<View style={styles.titleGroup}>
							<View style={styles.iconFeedback}>
								<IconAlarm />
							</View>
							<Text style={[styles.title, { color: colors.text }]}>
								{t("booking")}
							</Text>
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
								<View
									style={[
										styles.possibilityDot,
										{ backgroundColor: colors.text }
									]}
								/>
								<Text style={[styles.possibilityText, { color: colors.text }]}>
									{alarm}
								</Text>
							</View>
						))}
					</View>
				) : null}
				{data?.service.contacts[0] !== "" ? (
					<View style={[styles.feedbackItem, { borderColor: colors.text }]}>
						<View style={styles.titleGroup}>
							<View style={styles.iconFeedback}>
								<IconHeadphones />
							</View>
							<Text style={[styles.title, { color: colors.text }]}>
								{t("contact")}
							</Text>
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
								<View
									style={[
										styles.possibilityDot,
										{ backgroundColor: colors.text }
									]}
								/>
								<Text style={[styles.possibilityText, { color: colors.text }]}>
									{contact}
								</Text>
							</View>
						))}
					</View>
				) : null}
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
		borderRadius: 5 / 2
	},
	possibilityText: {
		fontFamily: "Lexend-Light",
		fontSize: 12,
		color: Colors.dark.secondary,
		lineHeight: 14
	}
});
