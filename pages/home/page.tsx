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
import { default as IconArrowLeftDark } from "@/shared/icons/arrow-left-big-black-dark.svg";
import { default as IconArrowLeft } from "@/shared/icons/arrow-left-big-black.svg";
import IconAvatarTwiceDark from "@/shared/icons/avatar-twice-dark.svg";
import IconAvatarTwice from "@/shared/icons/avatar-twice.svg";
import LocationIcon from "@/shared/icons/location-icon.svg";
import IconNoData from "@/shared/icons/no-data.svg";
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
				{item.status !== "normal" ? (
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
				) : null}

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

				{item.region ? (
					<View style={styles.serviceLocationWrapper}>
						<LocationIcon />
						<Text style={styles.serviceLocation}>{item?.region?.province}</Text>
					</View>
				) : null}

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
		<SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bgPage }]}>
			<View style={styles.scrollContainer}>
				<View style={styles.searchBox}>
					{isFiltered ? (
						<TouchableOpacity onPress={clearFilter}>
							{mode === "light" ? <IconArrowLeft /> : <IconArrowLeftDark />}
						</TouchableOpacity>
					) : null}

					<View style={[styles.inputContainer, { borderColor: colors.text }]}>
						<SearchIcon width={20} height={20} color={colors.text} />
						<TextInput
							placeholder=""
							value={search}
							onChangeText={setSearch}
							style={[styles.input, { color: colors.text }]}
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
					dataServices && dataServices?.data.length > 0 ? (
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
						<View style={styles.noData}>
							<View style={styles.noDataIcon}>
								<IconNoData />
							</View>
							<Text style={[styles.noDataText, { color: colors.text }]}>
								{t("noData")}
							</Text>
						</View>
					)
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
	noData: {
		flex: 1,
		justifyContent: "center",
		marginHorizontal: "auto"
	},
	noDataIcon: {
		marginHorizontal: "auto"
	},
	noDataText: {
		fontSize: 16,
		fontFamily: "Lexend-Regular",
		marginTop: 12,
		textAlign: "center"
	},
	safeArea: { flex: 1 },
	scrollContainer: { flexGrow: 1, paddingBottom: 70, width: "100%" },
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
		marginBottom: Platform.OS === "ios" ? 6 : 8,
		maxWidth: "90%",
		textAlign: "center"
	},
	serviceName: {
		fontSize: 10,
		fontFamily: "Lexend-Regular",
		color: Colors.light.secondary,
		marginBottom: Platform.OS === "ios" ? 6 : 8,
		maxWidth: "90%",
		textAlign: "center"
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
