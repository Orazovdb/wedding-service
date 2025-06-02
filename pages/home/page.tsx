import SearchIcon from "@/components/ui/SearchIcon";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";

import { categoriesService } from "@/shared/api/services/categories.service";
import { servicesService } from "@/shared/api/services/services.service";
import {
	CategoriesWithChildren,
	HumanServices,
	HumanServicesData
} from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import i18n from "@/shared/i18n";
import {
	default as IconArrowLeft,
	default as IconArrowLeftDark
} from "@/shared/icons/arrow-left-big-black.svg";
import LocationIcon from "@/shared/icons/location-icon.svg";
import GoldenIcon from "@/shared/icons/status-golden.svg";
import NewIcon from "@/shared/icons/status-new.svg";
import PremiumIcon from "@/shared/icons/status-premium.svg";
import { useRouter } from "expo-router";
import { t } from "i18next";
import { homeService } from "./home.service";
import { Home } from "./types";
import { HomeCategoriesSlider } from "./ui/HomeCategoriesSlider";
import { FilterModal } from "./ui/HomeFilter";
import { HomeMainBanner } from "./ui/HomeMainBanner";
import { HomeServices } from "./ui/HomeServices";

const { width, height } = Dimensions.get("window");
const gridItemHeight = (height - 280) / 3 + 1;

export const HomeScreen = () => {
	const currentLang = i18n.language;
	const { colors, mode } = useAppTheme();
	const router = useRouter();

	const [search, setSearch] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [data, setData] = useState<Home>();
	const [dataCategories, setDataCategories] =
		useState<CategoriesWithChildren[]>();
	const [dataServices, setDataServices] = useState<HumanServicesData>();
	const [isFiltered, setIsFiltered] = useState(false);

	const [statuses, setStatuses] = useState<string[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [regions, setRegions] = useState<string[]>([]);
	const [clearTrigger, setClearTrigger] = useState(false);

	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);

	useEffect(() => {
		categoriesService
			.getCategories({ parent: 1, lang: currentLang })
			.then(setDataCategories);
		homeService.getHome().then(setData);
	}, []);

	useEffect(() => {
		const fetchOnSearch = async () => {
			if (search.trim().length === 0) return;
			setPage(1);
			setHasMore(true);
			setIsFiltered(true);
			const result = await servicesService.getServices({
				category_ids: categories.join(",") || undefined,
				statuses: statuses.join(",") || undefined,
				provinces: regions.join(",") || undefined,
				name: search,
				page: 1,
				lang: currentLang
			});
			setDataServices(result);
		};
		fetchOnSearch();
	}, [search]);

	const handleFilterApply = async ({
		selectedRegions = [],
		selectedStatuses = [],
		selectedCategories = []
	}: {
		selectedRegions?: string[];
		selectedStatuses?: string[];
		selectedCategories?: string[];
	}) => {
		setRegions(selectedRegions);
		setStatuses(selectedStatuses);
		setCategories(selectedCategories);
		setPage(1);
		setHasMore(true);
		setIsFiltered(true);

		const result = await servicesService.getServices({
			category_ids: selectedCategories.join(",") || undefined,
			statuses: selectedStatuses.join(",") || undefined,
			provinces: selectedRegions.join(",") || undefined,
			name: search || undefined,
			page: 1,
			lang: currentLang
		});
		setDataServices(result);
	};

	const clearFilter = async () => {
		const empty = "";
		setIsFiltered(false);
		setStatuses([]);
		setCategories([]);
		setRegions([]);
		setSearch(empty);
		setClearTrigger(prev => !prev);
		setPage(1);
		setHasMore(true);

		const result = await servicesService.getServices({
			category_ids: empty,
			statuses: empty,
			provinces: empty,
			name: empty,
			page: 1,
			lang: currentLang
		});
		setDataServices(result);
	};

	const loadMoreData = async () => {
		if (!hasMore || loadingMore) return;
		setLoadingMore(true);
		const nextPage = page + 1;
		const result = await servicesService.getServices({
			category_ids: categories.join(",") || undefined,
			statuses: statuses.join(",") || undefined,
			provinces: regions.join(",") || undefined,
			name: search || undefined,
			page: nextPage,
			lang: currentLang
		});

		setDataServices(prev => ({
			...result,
			data: [...(prev?.data || []), ...result.data]
		}));

		if (result.data.length < 6) setHasMore(false);
		else setPage(nextPage);

		setLoadingMore(false);
	};

	const onToggleFollow = async () => {
		await homeService.getHome().then(setData);
	};

	const toggleFollow = async (service_id: number) => {
		await servicesService.toggleFollowService({ service_id });
		onToggleFollow();
	};

	const renderItem = ({ item }: { item: HumanServices }) => (
		<View style={[styles.gridItem, { height: gridItemHeight }]}>
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
				style={[
					styles.categoryItem,
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
				<Image source={{ uri: item.logo }} style={styles.categoryProfileImg} />
				{item.name ? (
					(() => {
						const [firstWord = "", secondWord = ""] = item.name.split(" ");
						return (
							<>
								<Text style={[styles.categoryUsername, { color: colors.text }]}>
									{firstWord}
								</Text>
								<Text
									style={[styles.categoryUserSurName, { color: colors.text }]}
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
					<TouchableOpacity
						onPress={() => toggleFollow(item.id)}
						style={[
							styles.subscribeButton,
							mode === "dark"
								? { backgroundColor: colors.secondary }
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
				</View>
			</TouchableOpacity>
		</View>
	);

	return (
		<SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bgPage }]}>
			<View style={styles.scrollContainer}>
				<View style={styles.searchBox}>
					{isFiltered && (
						<TouchableOpacity onPress={clearFilter}>
							{mode === "light" ? <IconArrowLeft /> : <IconArrowLeftDark />}
						</TouchableOpacity>
					)}

					<View style={[styles.inputContainer, { borderColor: colors.text }]}>
						<SearchIcon width={20} height={20} color={colors.text} />
						<TextInput
							placeholder=""
							value={search}
							onChangeText={setSearch}
							style={[styles.input]}
							placeholderTextColor="#999"
						/>
						<FilterModal.Button
							isModalVisible={isModalVisible}
							setIsModalVisible={setIsModalVisible}
							categories={dataCategories}
							onFilterApply={handleFilterApply}
							setIsFiltered={setIsFiltered}
							isFiltered={isFiltered}
							clearTrigger={clearTrigger}
						/>
					</View>
				</View>
				{isFiltered ? (
					<FlatList
						data={dataServices?.data || []}
						keyExtractor={(item, index) => `${item.id}_${index}`}
						renderItem={renderItem}
						numColumns={2}
						columnWrapperStyle={{
							justifyContent: "space-between",
							paddingHorizontal: 20
						}}
						onEndReached={loadMoreData}
						onEndReachedThreshold={0.1}
						ListFooterComponent={<View style={{ height: 1 }} />}
						contentContainerStyle={{ paddingBottom: 30 }}
						style={{ flex: 1 }}
					/>
				) : (
					<ScrollView style={styles.home}>
						<HomeMainBanner data={data} />

						<HomeCategoriesSlider />

						<HomeServices data={data} onToggleFollow={onToggleFollow} />
					</ScrollView>
				)}
			</View>
			<FilterModal.Modal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
				categories={dataCategories}
				onFilterApply={handleFilterApply}
				setIsFiltered={setIsFiltered}
				isFiltered={isFiltered}
				clearTrigger={clearTrigger}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: { flex: 1 },
	scrollContainer: { flexGrow: 1, paddingBottom: 50 },
	home: {
		width: width,
		flex: 1
	},
	searchBox: {
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		paddingVertical: 3,
		borderWidth: 2,
		borderRadius: 8,
		backgroundColor: "transparent",
		paddingHorizontal: 10,
		marginTop: 16,
		marginBottom: 20
	},
	input: {
		flex: 1,
		fontSize: 14,
		paddingVertical: 6,
		marginLeft: 8
	},
	gridItem: { width: width / 2 - 30, marginBottom: 20 },
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
		borderRadius: 22.5,
		marginBottom: 4,
		backgroundColor: "#5BB271"
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
		width: "40%",
		height: 1,
		backgroundColor: Colors.dark.secondary,
		marginBottom: 4
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
		marginBottom: Platform.OS === "ios" ? 26 : 30
	},
	serviceLocation: {
		fontSize: 10,
		fontFamily: "Lexend-Light",
		color: Colors.light.secondary,
		flexWrap: "wrap",
		textAlign: "center"
	},
	serviceButtons: {
		justifyContent: "space-between",
		gap: 8,
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
