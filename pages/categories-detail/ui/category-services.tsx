import { Colors } from "@/constants/Colors";
import { HumanServices, HumanServicesData } from "@/shared/api/types";
import LocationIcon from "@/shared/icons/location-icon.svg";
import GoldenIcon from "@/shared/icons/status-golden.svg";
import NewIcon from "@/shared/icons/status-new.svg";
import PremiumIcon from "@/shared/icons/status-premium.svg";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
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

export const CategoryServices = ({
	data,
	onPageChange
}: {
	data: HumanServicesData | undefined;
	onPageChange?: (page: number) => void;
}) => {
	const insets = useSafeAreaInsets();
	const PAGE_HEIGHT =
		Dimensions.get("window").height - insets.top - insets.bottom - 200;
	const ITEMS_PER_PAGE = 6;
	const flatListRef = useRef<FlatList<any>>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const router = useRouter();

	const pagedData: HumanServices[][] = data?.data
		? Array.from(
				{ length: Math.ceil(data.data.length / ITEMS_PER_PAGE) },
				(_, index) => {
					const start = index * ITEMS_PER_PAGE;
					const end = start + ITEMS_PER_PAGE;
					const items = data.data.slice(start, end);
					while (items.length < ITEMS_PER_PAGE) {
						items.push(null as unknown as HumanServices);
					}
					return items;
				}
		  )
		: [];

	const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			const nextPage = viewableItems[0].index + 1;
			if (nextPage === currentPage) {
				setCurrentPage(nextPage);
				onPageChange?.(nextPage);
				console.log(currentPage);
			}
		}
	}).current;

	const renderPage = ({ item }: { item: HumanServices[] }) => (
		<View style={[styles.pageContainer, { height: PAGE_HEIGHT }]}>
			{item.map((item, index) => {
				if (!item)
					return (
						<View
							key={index}
							style={{ height: PAGE_HEIGHT / 3, width: width / 2 - 40 }}
						/>
					);
				return (
					<TouchableOpacity
						onPress={() => router.push(`/home/${item.id}`)}
						key={item.id}
						style={[styles.categoryList, { height: PAGE_HEIGHT / 3 }]}
					>
						<View
							style={[
								styles.categoryItem,
								item.status === "premium"
									? styles.categoryItemPremium
									: item.status === "golden"
									? styles.categoryItemGold
									: null
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
											: null
									]}
								>
									<Text style={styles.categoryItemStatusText}>
										{item.status === "premium"
											? "premium"
											: item.status === "golden"
											? "golden"
											: item.status === "new"
											? "täze"
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
									const [firstWord = "", secondWord = ""] =
										item.name.split(" ");
									return (
										<>
											<Text style={styles.categoryUsername}>{firstWord}</Text>
											<Text style={styles.categoryUserSurName}>
												{secondWord}
											</Text>
										</>
									);
								})()
							) : (
								<Text style={styles.categoryUsername}>
									service-provider_{item.id}
								</Text>
							)}
							<View style={styles.serviceDivider} />
							<Text style={styles.categoryName}>{item.categories[0].name}</Text>
							<Text style={styles.serviceName}>{item.name}</Text>
							<View style={styles.serviceLocationWrapper}>
								<LocationIcon />
								{(() => {
									const [firstWord = "", secondWord = ""] =
										item.region.name.split(" ");
									return (
										<>
											<Text style={styles.serviceLocation}>
												{firstWord} {secondWord}, {item.region.province}
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
									<Text style={styles.subscriptionsButtonText}>agza</Text>
								</View>
								<TouchableOpacity
									style={[
										styles.subscribeButton,
										item.status === "golden" && styles.subscribeButtonGold
									]}
								>
									<Text
										style={[
											styles.subscribeButtonText,
											item.status === "golden" && styles.subscribeButtonGoldText
										]}
									>
										Agza
									</Text>
									<Text
										style={[
											styles.subscribeButtonText,
											item.status === "golden" && styles.subscribeButtonGoldText
										]}
									>
										bol
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.paginationContainer}>
				{Array.from({ length: Number(data?.meta?.total) / ITEMS_PER_PAGE }).map(
					(_, index) => (
						<View
							key={index}
							style={[
								styles.paginationDot,
								index + 1 === currentPage && styles.paginationDotActive
							]}
						/>
					)
				)}
				<Text>{Number(data?.meta?.total) / ITEMS_PER_PAGE}</Text>
			</View>
			<FlatList
				ref={flatListRef}
				data={pagedData}
				keyExtractor={(_, index) => index.toString()}
				renderItem={renderPage}
				pagingEnabled
				snapToInterval={PAGE_HEIGHT}
				decelerationRate="fast"
				showsVerticalScrollIndicator={false}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
				getItemLayout={(_, index) => ({
					length: PAGE_HEIGHT,
					offset: PAGE_HEIGHT * index,
					index
				})}
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
		borderRadius: 15 / 2,
		backgroundColor: "#00000033"
	},
	paginationDotActive: {
		backgroundColor: Colors.light.secondary
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
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 12
	},
	subscriptionsButton: {
		paddingVertical: 6.5,
		paddingHorizontal: 4.5,
		backgroundColor: Colors.light.secondary,
		borderRadius: 3
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
		borderWidth: 1,
		borderColor: "#000"
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
