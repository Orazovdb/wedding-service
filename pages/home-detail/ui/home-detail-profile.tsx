import { Colors } from "@/constants/Colors";
import { HumanServicesByIdData } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import IconAvatarDark from "@/shared/icons/avatar-icon-dark.svg";
import IconAvatar from "@/shared/icons/avatar-icon.svg";
import IconFlagDark from "@/shared/icons/flag-icon-dark.svg";
import IconFlag from "@/shared/icons/flag-icon.svg";
import IconCategoryDark from "@/shared/icons/musician-icon-dark.svg";
import IconCategory from "@/shared/icons/musician-icon.svg";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const HomeDetailProfile = ({
	data,
	onToggleFollow
}: {
	data: HumanServicesByIdData | undefined;
	onToggleFollow: () => void;
}) => {
	const router = useRouter();
	const { t } = useTranslation();
	const { colors, mode } = useAppTheme();

	return (
		<View style={styles.profile}>
			<View style={styles.avatarBlock}>
				{data?.service.logo && (
					<Image source={{ uri: data?.service?.logo }} style={styles.avatar} />
				)}
				<View style={styles.profileNameWrapper}>
					<Text style={[styles.profileName, { color: colors.text }]}>
						{data?.service?.name}
					</Text>
					<TouchableOpacity
						onPress={() =>
							router.push(`/categories/${data?.service?.categories[0].id}/all`)
						}
						style={styles.profileCategory}
					>
						{mode === "light" ? <IconCategory /> : <IconCategoryDark />}

						<Text style={[styles.profileCategoryText, { color: colors.text }]}>
							{data?.service?.categories[0]?.name}
						</Text>
					</TouchableOpacity>
				</View>
				{/* <Text style={styles.profileExperience}>3+ year experience</Text> */}
			</View>
			<View style={styles.subscribersBlock}>
				<View style={styles.location}>
					{mode === "light" ? <IconFlag /> : <IconFlagDark />}
					<Text style={[styles.locationText, { color: colors.text }]}>
						{data?.service?.region?.province}
					</Text>
				</View>
				<View style={[styles.subscribeCount, { backgroundColor: colors.text }]}>
					{mode === "light" ? <IconAvatar /> : <IconAvatarDark />}
					<Text
						style={[styles.subscribeCountText, { color: colors.textReverse }]}
					>
						{data?.service?.followers_count} {t("subscriber")}
					</Text>
				</View>
				<TouchableOpacity
					onPress={() => onToggleFollow()}
					style={styles.subscribeButton}
				>
					<Text style={[styles.subscribeButtonText, { color: colors.text }]}>
						{data?.service?.is_followed
							? `${t("unSubscribe")}`
							: `${t("subscribe")}`}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	profile: {},
	avatarBlock: {
		flexDirection: "row",
		gap: 8,
		alignItems: "flex-start",
		paddingHorizontal: 24,
		marginVertical: 14
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 60 / 2
	},
	profileNameWrapper: {},
	profileName: {
		fontFamily: "Lexend-SemiBold",
		fontSize: 16,
		marginBottom: 6,
		color: Colors.dark.secondary
	},
	profileCategory: {
		flexDirection: "row",
		gap: 6,
		alignItems: "center"
	},
	profileCategoryIcon: {
		width: 24,
		height: 24,
		borderRadius: 2
	},
	profileCategoryText: {
		fontFamily: "Lexend-Light",
		fontSize: 14,
		color: Colors.dark.secondary,
		textDecorationLine: "underline",
		flexWrap: "wrap"
	},
	profileExperience: {
		backgroundColor: Colors.dark.primary,
		paddingVertical: 2,
		paddingHorizontal: 4,
		fontSize: 12,
		fontFamily: "Lexend-Light",
		color: Colors.dark.secondary,
		borderRadius: 6,
		marginTop: 2
	},

	subscribersBlock: {
		paddingVertical: 6,
		borderColor: "#BFBFBF",
		borderTopWidth: 1,
		borderBottomWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 24,
		flexWrap: "wrap"
	},
	location: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		flexWrap: "wrap"
	},
	locationText: {
		fontFamily: "Lexend-Light",

		fontSize: 14
	},
	subscribeButtons: {},
	subscribeCount: {
		flexDirection: "row",
		alignItems: "center",
		gap: 3,
		borderRadius: 6,
		paddingVertical: 6,
		paddingHorizontal: 12,
		marginLeft: "auto"
	},
	subscribeCountText: {
		color: Colors.dark.white,
		fontSize: 14,
		fontFamily: "Lexend-Light"
	},
	subscribeButton: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
		marginLeft: "auto"
	},
	subscribeButtonText: {
		fontFamily: "Lexend-SemiBold",
		fontSize: 14,
		color: Colors.dark.secondary,
		textDecorationLine: "underline"
	}
});
