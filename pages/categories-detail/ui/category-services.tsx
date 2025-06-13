import { Colors } from "@/constants/Colors";
import { servicesService } from "@/shared/api/services/services.service";
import { HumanServices } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import IconAvatarTwiceDark from "@/shared/icons/avatar-twice-dark.svg";
import IconAvatarTwice from "@/shared/icons/avatar-twice.svg";
import LocationIcon from "@/shared/icons/location-icon.svg";
import GoldenIcon from "@/shared/icons/status-golden.svg";
import NewIcon from "@/shared/icons/status-new.svg";
import PremiumIcon from "@/shared/icons/status-premium.svg";
import { useRouter } from "expo-router";
import { t } from "i18next";
import React, { useCallback } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

interface Props {
	page: number;
	setPage: (page: number) => void;
	data: any; // HumanServicesData
	onToggleFollow: () => void;
}

export const CategoryServices = ({
	page,
	setPage,
	data,
	onToggleFollow
}: Props) => {
	const { colors, mode } = useAppTheme();
	const insets = useSafeAreaInsets();
	const router = useRouter();

	const loadMore = useCallback(() => {
		if (!data.meta) return;
		const totalPages = Math.ceil(data.meta.total / data.meta.limit);
		if (page < totalPages) setPage(page + 1);
	}, [page, data.meta]);

	const toggleFollow = async (service_id: number) => {
		await servicesService.toggleFollowService({ service_id });
		onToggleFollow();
	};

	const renderItem = ({ item }: { item: HumanServices }) => (
		<TouchableOpacity
			onPress={() =>
				router.push({ pathname: `/home/[id]`, params: { id: item.id } })
			}
			activeOpacity={0.6}
			key={item.id}
			style={styles.categoryList}
		>
			<View
				style={[
					styles.categoryItem,
					item.status === "premium"
						? styles.categoryItemPremium
						: item.status === "golden"
						? styles.categoryItemGold
						: {},
					{
						backgroundColor:
							item.status === "golden"
								? styles.categoryItemGold.backgroundColor
								: item.status === "premium"
								? styles.categoryItemPremium.backgroundColor
								: colors.bgServiceItem,
						shadowColor: colors.text
					}
				]}
			>
				{item.status !== "normal" && (
					<View
						style={[
							styles.categoryItemStatus,
							item.status === "premium"
								? styles.categoryItemStatusPremium
								: item.status === "golden"
								? styles.categoryItemStatusGold
								: item.status === "new"
								? styles.categoryItemStatusNew
								: {}
						]}
					>
						<Text style={styles.categoryItemStatusText}>{t(item.status)}</Text>
						{item.status === "premium" ? (
							<PremiumIcon />
						) : item.status === "golden" ? (
							<GoldenIcon />
						) : item.status === "new" ? (
							<NewIcon />
						) : null}
					</View>
				)}

				<Image source={{ uri: item.logo }} style={styles.categoryProfileImg} />

				<Text style={[styles.categoryUsername, { color: colors.text }]}>
					{item.name?.split(" ")[0] || `service-provider_${item.id}`}
				</Text>
				<Text style={[styles.categoryUserSurName, { color: colors.text }]}>
					{item.name?.split(" ")[1] || ""}
				</Text>

				<View
					style={[styles.serviceDivider, { backgroundColor: colors.text }]}
				/>

				<Text style={[styles.categoryName, { color: colors.text }]}>
					{item.categories[0].name}
				</Text>
				<Text style={[styles.serviceName, { color: colors.text }]}>
					{item.name}
				</Text>

				<View style={styles.serviceLocationWrapper}>
					<LocationIcon />
					<Text style={styles.serviceLocation}>{item.region.province}</Text>
				</View>

				<View style={styles.serviceButtons}>
					<View style={styles.subscriptionsButton}>
						{mode === "light" ? <IconAvatarTwice /> : <IconAvatarTwiceDark />}
						<Text
							style={[styles.subscriptionsButtonText, { color: colors.text }]}
						>
							{item.followers_count}
						</Text>
						<Text
							style={[
								styles.subscriptionsButtonSubscriberText,
								{ color: colors.text }
							]}
						>
							{t("subscriber")}
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => toggleFollow(item.id)}
						style={[
							styles.subscribeButton,
							mode === "dark"
								? { backgroundColor: "#000" }
								: { backgroundColor: "#000" },
							item.status === "golden" && styles.subscribeButtonGold,
							item.is_followed && { backgroundColor: "#0000004D" }
						]}
					>
						<Text
							style={[
								styles.subscribeButtonText,
								{ color: colors.white },
								item.status === "golden" && styles.subscribeButtonGoldText
							]}
						>
							{t(item.is_followed ? "subscribed" : "subscribe")}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<FlatList
			contentContainerStyle={styles.flatList}
			data={data.data}
			keyExtractor={item => item.id.toString()}
			renderItem={renderItem}
			onEndReached={loadMore}
			onEndReachedThreshold={0.6}
			showsVerticalScrollIndicator={false}
		/>
	);
};

const styles = StyleSheet.create({
	flatList: {
		paddingHorizontal: 20,
		paddingBottom: 80,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},
	categoryList: {
		width: width / 2 - 20,
		paddingHorizontal: 7,
		paddingVertical: 7
	},
	categoryItem: {
		paddingTop: 2,
		paddingBottom: 8,
		paddingVertical: 12,
		alignItems: "center",
		borderRadius: 4,
		position: "relative",

		// iOS shadow
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1.51 },
		shadowOpacity: 0.25,
		shadowRadius: 3.02,

		// Android shadow
		elevation: 3,

		backgroundColor: "#fff" // REQUIRED for elevation to be visible
	},

	categoryItemPremium: {
		backgroundColor: "#2FD2FF33",
		elevation: 0
	},
	categoryItemGold: {
		backgroundColor: "rgba(232, 200, 96, 0.538)",
		elevation: 0
	},
	categoryItemStatus: {
		position: "absolute",
		left: 0,
		top: 0,
		borderRadius: 4,
		backgroundColor: "transparent",
		height: 16,
		paddingHorizontal: 3,
		alignItems: "center",
		justifyContent: "center",
		borderBottomLeftRadius: 0,
		borderTopEndRadius: 0,
		flexDirection: "row",
		gap: 5
	},
	categoryItemStatusPremium: {
		backgroundColor: "#2FD2FF"
	},
	categoryItemStatusGold: {
		backgroundColor: "#D4AF37"
	},
	categoryItemStatusNew: {
		backgroundColor: "#5BB271"
	},
	categoryItemStatusText: {
		color: "#fff",
		fontSize: 8,
		fontFamily: "Lexend-Regular"
	},
	categoryProfileImg: {
		width: 40,
		height: 40,
		borderRadius: 22.5
	},
	categoryUsername: {
		fontSize: 12,
		fontFamily: "Lexend-Regular",
		lineHeight: 13
	},
	categoryUserSurName: {
		fontSize: 12,
		fontFamily: "Lexend-Regular",
		lineHeight: 13,
		marginBottom: 6
	},
	serviceDivider: {
		width: "50%",
		height: 1,
		backgroundColor: Colors.dark.secondary,
		marginBottom: 6
	},
	categoryName: {
		fontSize: 10,
		fontFamily: "Lexend-ExtraLight",
		color: Colors.light.secondary,
		marginBottom: Platform.OS === "ios" ? 6 : 8
	},
	serviceName: {
		fontSize: 10,
		fontFamily: "Lexend-Regular",
		color: Colors.light.secondary,
		marginBottom: Platform.OS === "ios" ? 6 : 8
	},
	serviceLocationWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingVertical: 3,
		paddingHorizontal: 4,
		borderRadius: 5,
		backgroundColor: Colors.dark.primary,
		marginBottom: Platform.OS === "ios" ? 8 : 12
	},
	serviceLocation: {
		fontSize: 10,
		fontFamily: "Lexend-Light",
		color: Colors.light.secondary
	},
	serviceButtons: {
		gap: 8,
		width: "100%",
		paddingHorizontal: 12
	},
	subscriptionsButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignContent: "flex-end",
		gap: 6,
		marginBottom: 4
	},
	subscriptionsButtonText: {
		fontSize: 14,
		fontFamily: "Lexend-Medium"
	},
	subscriptionsButtonSubscriberText: {
		fontSize: 9,
		fontFamily: "Lexend-Regular",
		marginTop: 6
	},
	subscribeButton: {
		paddingVertical: 3.2,
		paddingHorizontal: 4.5,
		borderRadius: 6,
		width: "84%",
		marginHorizontal: "auto"
	},
	subscribeButtonGold: {
		backgroundColor: "#D4AF37",
		borderColor: "transparent"
	},
	subscribeButtonText: {
		fontSize: 10,
		color: Colors.light.secondary,
		fontFamily: "Lexend-Regular",
		textAlign: "center"
	},
	subscribeButtonGoldText: {
		color: "#fff"
	}
});
