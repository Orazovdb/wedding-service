import { Colors } from "@/constants/Colors";
import { servicesService } from "@/shared/api/services/services.service";
import { HumanServices, HumanServicesData } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import LocationIcon from "@/shared/icons/location-icon.svg";
import GoldenIcon from "@/shared/icons/status-golden.svg";
import NewIcon from "@/shared/icons/status-new.svg";
import PremiumIcon from "@/shared/icons/status-premium.svg";
import { useRouter } from "expo-router";
import { t } from "i18next";
import React, { useRef } from "react";
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

const { height, width } = Dimensions.get("window");

interface Props {
	page: number;
	setPage: (page: number) => void;
	data: HumanServicesData;
	onToggleFollow: () => void;
}

export const CategoryServices = (props: Props) => {
	const insets = useSafeAreaInsets();
	const { colors, mode } = useAppTheme();
	const PAGE_HEIGHT =
		Dimensions.get("window").height - insets.top - insets.bottom - 180;
	const itemHeight = PAGE_HEIGHT / 3;

	const ITEMS_PER_PAGE = 6;
	const router = useRouter();
	const flatListRef = useRef<FlatList<any>>(null);

	const totalItems = props.data.meta.total;
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

	const pagedData = Array.from({ length: totalPages }, (_, index) => {
		const start = index * ITEMS_PER_PAGE;
		const end = Math.min(start + ITEMS_PER_PAGE, totalItems);
		return props.data.data.slice(start, end);
	});

	const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			props.setPage(viewableItems[0].index);
		}
	}).current;

	const toggleFollow = async (service_id: number) => {
		await servicesService.toggleFollowService({ service_id });
		props.onToggleFollow();
	};

	const renderPage = ({ item }: { item: HumanServices[] }) => (
		<View style={[styles.pageContainer, { minHeight: PAGE_HEIGHT }]}>
			{item.map(item => (
				<TouchableOpacity
					onPress={() =>
						router.push({
							pathname: `/home/[id]`,
							params: {
								id: item.id
							}
						})
					}
					activeOpacity={0.6}
					key={item.id}
					style={styles.categoryList}
				>
					<View
						style={[
							styles.categoryItem,
							{ height: itemHeight - 20 },
							item.status === "premium"
								? styles.categoryItemPremium
								: item.status === "golden"
								? styles.categoryItemGold
								: "",
							{
								backgroundColor: colors.bgServiceItem,
								shadowColor: colors.bgSeeMoreBtn
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
										: ""
								]}
							>
								<Text style={styles.categoryItemStatusText}>
									{item.status === "premium"
										? t("premium")
										: item.status === "golden"
										? t("golden")
										: item.status === "new"
										? t("new")
										: ""}
								</Text>
								{item.status === "premium" ? (
									<PremiumIcon />
								) : item.status === "golden" ? (
									<GoldenIcon />
								) : item.status === "new" ? (
									<NewIcon />
								) : null}
							</View>
						)}
						<Image
							source={{ uri: item.logo }}
							style={styles.categoryProfileImg}
						/>
						{item.name ? (
							(() => {
								const [firstWord = "", secondWord = ""] = item.name.split(" ");
								return (
									<>
										<Text
											style={[styles.categoryUsername, { color: colors.text }]}
										>
											{firstWord}
										</Text>
										<Text
											style={[
												styles.categoryUserSurName,
												{ color: colors.text }
											]}
										>
											{secondWord}
										</Text>
									</>
								);
							})()
						) : (
							<Text style={[styles.categoryUsername, { color: colors.text }]}>
								service-provider_{item.id}
							</Text>
						)}

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
							{(() => {
								const [firstWord = "", secondWord = ""] =
									item.region.name.split(" ");
								return (
									<>
										<Text style={styles.serviceLocation}>
											{firstWord} {secondWord.slice(0, 1)}.,{" "}
											{item.region.province.slice(0, 4)}
										</Text>
									</>
								);
							})()}
						</View>
						<View style={styles.serviceButtons}>
							<View style={styles.subscriptionsButton}>
								<Text style={styles.subscriptionsButtonText}>
									{item.followers_count}
								</Text>
								<Text style={styles.subscriptionsButtonText}>
									{t("subscriber")}
								</Text>
							</View>
							{item.is_followed ? (
								<TouchableOpacity
									onPress={() => toggleFollow(item.id)}
									style={[
										styles.subscribeButton,
										mode === "dark"
											? { backgroundColor: "#000", borderColor: colors.text }
											: { backgroundColor: colors.white },
										item.status === "golden" && styles.subscribeButtonGold
									]}
								>
									<Text
										style={[
											styles.subscribeButtonText,
											{ color: colors.text },
											item.status === "golden" && styles.subscribeButtonGoldText
										]}
									>
										{t("unSubscribe")}
									</Text>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									onPress={() => toggleFollow(item.id)}
									style={[
										styles.subscribeButton,
										mode === "dark"
											? { backgroundColor: "", borderColor: colors.text }
											: { backgroundColor: colors.white },
										item.status === "golden" && styles.subscribeButtonGold
									]}
								>
									<Text
										style={[
											styles.subscribeButtonText,
											{ color: colors.text },
											item.status === "golden" && styles.subscribeButtonGoldText
										]}
									>
										{t("subscribe")}
									</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</TouchableOpacity>
			))}
		</View>
	);

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				flex: 1,
				paddingBottom: 50
			}}
		>
			{pagedData.length > 1 && (
				<View style={styles.paginationContainer}>
					{pagedData.map((_, index) => (
						<View
							key={index}
							style={[
								styles.paginationDot,
								{ backgroundColor: colors.bgDot2 },
								index === props.page && { backgroundColor: colors.text }
							]}
						/>
					))}
				</View>
			)}
			<FlatList
				ref={flatListRef}
				data={pagedData}
				keyExtractor={(_, index) => index.toString()}
				renderItem={renderPage}
				pagingEnabled
				showsVerticalScrollIndicator={false}
				snapToInterval={PAGE_HEIGHT}
				decelerationRate="fast"
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={{
					viewAreaCoveragePercentThreshold: 50
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	services: {
		width: "100%",
		marginBottom: 20
	},
	servicesTitleBlock: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 16
	},
	servicesTitle: {
		fontSize: 16,
		fontWeight: "600"
	},
	servicesCategoryButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
		padding: 2,
		backgroundColor: "#0000001A"
	},
	servicesCategoryButtonText: {
		fontSize: 12,
		fontWeight: "400"
	},
	paginationContainer: {
		position: "absolute",
		left: 6,
		top: height / 3.8,
		zIndex: 10,
		justifyContent: "center",
		alignItems: "center",
		gap: 10
	},
	paginationDot: {
		width: 15,
		height: 15,
		borderRadius: 15 / 2
	},
	pageContainer: {
		paddingHorizontal: 40,
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	categoryList: {
		width: width / 2 - 40,
		paddingHorizontal: 7,
		paddingVertical: 7
	},
	categoryItem: {
		paddingTop: 2,
		paddingBottom: 8,
		paddingVertical: 12,
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1.51 },
		shadowOpacity: 0.25,
		shadowRadius: 3.02,
		elevation: 2,
		borderBottomWidth: 1,
		borderBottomColor: "#00000040",
		borderTopWidth: 1,
		borderTopColor: "#00000040",
		alignItems: "center",
		borderRadius: 4,
		position: "relative"
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
		marginBottom: 4
	},
	serviceDivider: {
		width: "50%",
		height: 1,
		backgroundColor: Colors.dark.secondary,
		marginBottom: 4
	},
	categoryName: {
		fontSize: 10,
		fontFamily: "Lexend-ExtraLight",
		color: Colors.light.secondary,
		marginBottom: Platform.OS === "ios" ? 2 : 4
	},
	serviceName: {
		fontSize: 10,
		fontFamily: "Lexend-Regular",
		color: Colors.light.secondary,
		marginBottom: Platform.OS === "ios" ? 2 : 4
	},
	serviceLocationWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingVertical: 3,
		paddingHorizontal: 4,
		borderRadius: 5,
		backgroundColor: Colors.dark.primary,
		marginBottom: Platform.OS === "ios" ? 6 : 10
	},
	serviceLocation: {
		fontSize: 10,
		fontFamily: "Lexend-Light",
		color: Colors.light.secondary
	},
	serviceButtons: {
		gap: 8,
		width: "100%",
		paddingHorizontal: 12,
		marginTop: "auto"
	},
	subscriptionsButton: {
		paddingVertical: 6.5,
		paddingHorizontal: 4.5,
		backgroundColor: Colors.light.secondary,
		borderRadius: 3,
		flexDirection: "row",
		justifyContent: "center",
		gap: 6
	},
	subscriptionsButtonText: {
		fontSize: 10,
		color: "#FFF1F1",
		fontFamily: "Lexend-Regular",
		textAlign: "center"
	},
	subscribeButton: {
		paddingVertical: 3.5,
		paddingHorizontal: 4.5,
		borderRadius: 3,
		borderWidth: 1
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
