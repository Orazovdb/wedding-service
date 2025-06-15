import { HumanServicesByIdData } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";

const MAX_HEIGHT = 294;

function splitTextToFit(
	text: string,
	style: { fontSize: number },
	maxHeight: number
): [string, string] {
	const charPerLine = Math.floor(100 / style.fontSize);
	const maxLines = Math.floor(maxHeight / style.fontSize);
	const maxLength = charPerLine * maxLines;
	return [text.slice(0, maxLength), text.slice(maxLength)];
}

export const HomeDetailAbout = ({
	data
}: {
	data: HumanServicesByIdData | undefined;
}) => {
	const { t } = useTranslation();
	const { colors } = useAppTheme();

	const [mainText, extraText] = splitTextToFit(
		data?.service?.description ?? "",
		styles.description,
		MAX_HEIGHT
	);

	return (
		<View style={styles.about}>
			<Text style={[styles.title, { color: colors.text }]}>{t("aboutMe")}</Text>
			<View style={styles.row}>
				{data?.service.logo ? (
					<Image source={{ uri: data.service.logo }} style={styles.image} />
				) : null}
				<View style={[styles.info, !data?.service.logo && { width: "auto" }]}>
					<View style={styles.descriptionWrapper}>
						<Text
							style={[styles.description, { color: colors.text }]}
							numberOfLines={100}
						>
							<Text
								style={{ fontFamily: "Lexend-Regular", color: colors.text }}
							>
								{t("hi")}
							</Text>
							, {mainText}
						</Text>
					</View>
					{!extraText ? (
						<Text style={[styles.meeting, { color: colors.text }]}>
							{t("sincerely")}, {data?.service.name}
						</Text>
					) : null}
				</View>
			</View>

			{extraText ? (
				<Text style={[styles.extra, { color: colors.text }]}>{extraText}</Text>
			) : null}
			{extraText ? (
				<Text style={[styles.meeting, { color: colors.text }]}>
					{t("sincerely")}, {data?.service.name}
				</Text>
			) : null}
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
		fontSize: 14,
		fontFamily: "Lexend-Regular",
		marginBottom: 6
	},
	row: {
		flexDirection: "row",
		gap: 16
	},
	image: {
		width: "50%",
		height: 144,
		resizeMode: "cover",
		borderRadius: 6,
		marginTop: 10
	},
	info: {
		width: "50%",
		justifyContent: "space-between"
	},
	descriptionWrapper: {
		height: 144,
		overflow: "hidden"
	},
	description: {
		fontFamily: "Lexend-ExtraLight",
		fontSize: 14
	},
	meeting: {
		fontFamily: "Lexend-Regular",
		fontSize: 14,
		marginTop: 8
	},

	extra: {
		fontFamily: "Lexend-Light",
		fontSize: 14,
		marginTop: 8
	}
});
