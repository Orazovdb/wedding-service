import { Colors } from "@/constants/Colors";
import { HumanServicesByIdData } from "@/shared/api/types";
import IconAvatar from "@/shared/icons/avatar-icon.svg";
import IconFlag from "@/shared/icons/flag-icon.svg";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const HomeDetailProfile = ({
	data
}: {
	data: HumanServicesByIdData | undefined;
}) => {
	const router = useRouter();
	return (
		<View style={styles.profile}>
			<View style={styles.avatarBlock}>
				<Image source={{ uri: data?.service?.logo }} style={styles.avatar} />
				<View style={styles.profileNameWrapper}>
					<Text style={styles.profileName}>{data?.service?.name}</Text>
					<TouchableOpacity
						onPress={() =>
							router.push(`/categories/${data?.service?.categories[0].id}/all`)
						}
						style={styles.profileCategory}
					>
						<Image
							source={{ uri: data?.service.categories[0]?.icon }}
							style={styles.profileCategoryIcon}
						/>

						<Text style={styles.profileCategoryText}>
							{data?.service?.categories[0]?.name}
						</Text>
					</TouchableOpacity>
				</View>
				{/* <Text style={styles.profileExperience}>3+ year experience</Text> */}
			</View>
			<View style={styles.subscribersBlock}>
				<View style={styles.location}>
					<IconFlag />
					<Text style={styles.locationText}>
						{data?.service?.region.name}, {data?.service?.region.province}
					</Text>
				</View>
				<View style={styles.subscribeButtons}>
					<View style={styles.subscribeCount}>
						<IconAvatar />
						<Text style={styles.subscribeCountText}>
							{data?.service?.followers_count} agza
						</Text>
					</View>
					<TouchableOpacity style={styles.subscribeButton}>
						<Text style={styles.subscribeButtonText}>Agza bol</Text>
					</TouchableOpacity>
				</View>
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
		paddingHorizontal: 24
	},
	location: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4
	},
	locationText: {
		fontFamily: "Lexend-Light",
		color: Colors.dark.secondary,
		fontSize: 14
	},
	subscribeButtons: {
		flexDirection: "row",
		alignItems: "center"
	},
	subscribeCount: {
		flexDirection: "row",
		alignItems: "center",
		gap: 3,
		backgroundColor: Colors.dark.secondary,
		borderRadius: 6,
		paddingVertical: 6,
		paddingHorizontal: 12
	},
	subscribeCountText: {
		color: Colors.dark.white,
		fontSize: 14,
		fontFamily: "Lexend-Light"
	},
	subscribeButton: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6
	},
	subscribeButtonText: {
		fontFamily: "Lexend-SemiBold",
		fontSize: 14,
		color: Colors.dark.secondary,
		textDecorationLine: "underline"
	}
});
