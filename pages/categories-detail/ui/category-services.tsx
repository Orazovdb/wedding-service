import { Colors } from "@/constants/Colors";
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
import { FakeSlides } from "../data";
import { CategoryItem } from "../types";

const { height, width } = Dimensions.get("window");

export const CategoryServices = () => {
	const insets = useSafeAreaInsets();
	const PAGE_HEIGHT =
		Dimensions.get("window").height - insets.top - insets.bottom - 200;
	const ITEMS_PER_PAGE = 6;
	const router = useRouter();
	const flatListRef = useRef<FlatList<any>>(null);
	const [currentPage, setCurrentPage] = useState(0);
	const totalPages = Math.ceil(FakeSlides.length / ITEMS_PER_PAGE);

	const pagedData = Array.from({ length: totalPages }, (_, index) => {
		const start = index * ITEMS_PER_PAGE;
		const end = start + ITEMS_PER_PAGE;
		return FakeSlides.slice(start, end);
	});

	const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			setCurrentPage(viewableItems[0].index);
		}
	}).current;

	const renderPage = ({ item }: { item: CategoryItem[] }) => (
		<View style={[styles.pageContainer, { height: PAGE_HEIGHT }]}>
			{item.map(user => (
				<View key={user.id} style={styles.categoryList}>
					<View
						style={[
							styles.categoryItem,
							user.status === "premium"
								? styles.categoryItemPremium
								: user.status === "gold"
								? styles.categoryItemGold
								: null
						]}
					>
						{user.status !== "static" && (
							<View
								style={[
									styles.categoryItemStatus,
									user.status === "premium"
										? styles.categoryItemStatusPremium
										: user.status === "gold"
										? styles.categoryItemStatusGold
										: user.status === "new"
										? styles.categoryItemStatusNew
										: null
								]}
							>
								<Text style={styles.categoryItemStatusText}>
									{user.status === "premium"
										? "premium"
										: user.status === "gold"
										? "golden"
										: user.status === "new"
										? "täze"
										: ""}
								</Text>
								{user.status === "premium" ? (
									<PremiumIcon />
								) : user.status === "gold" ? (
									<GoldenIcon />
								) : user.status === "new" ? (
									<NewIcon />
								) : null}
							</View>
						)}
						<Image source={user.image} style={styles.categoryProfileImg} />
						<Text style={styles.categoryUsername}>Mark</Text>
						<Text style={styles.categoryUserSurName}>Manson</Text>
						<View style={styles.serviceDivider} />
						<TouchableOpacity onPress={() => router.push("/home/1")}>
							<Text style={styles.categoryName}>Mashyn bezegci</Text>
						</TouchableOpacity>
						<Text style={styles.serviceName}>BMW</Text>
						<View style={styles.serviceLocationWrapper}>
							<LocationIcon />
							<Text style={styles.serviceLocation}>Ahal, Gokdepe</Text>
						</View>
						<View style={styles.serviceButtons}>
							<View style={styles.subscriptionsButton}>
								<Text style={styles.subscriptionsButtonText}>100K</Text>
								<Text style={styles.subscriptionsButtonText}>agza</Text>
							</View>
							<TouchableOpacity
								style={[
									styles.subscribeButton,
									user.status === "gold" && styles.subscribeButtonGold
								]}
							>
								<Text
									style={[
										styles.subscribeButtonText,
										user.status === "gold" && styles.subscribeButtonGoldText
									]}
								>
									Agza
								</Text>
								<Text
									style={[
										styles.subscribeButtonText,
										user.status === "gold" && styles.subscribeButtonGoldText
									]}
								>
									bol
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
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
			<View style={styles.paginationContainer}>
				{pagedData.map((_, index) => (
					<View
						key={index}
						style={[
							styles.paginationDot,
							index === currentPage && styles.paginationDotActive
						]}
					/>
				))}
			</View>
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
				viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
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
