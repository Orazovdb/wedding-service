import { Colors } from "@/constants/Colors";
import { categoriesService } from "@/shared/api/services/categories.service";
import { servicesService } from "@/shared/api/services/services.service";
import {
	CategoriesWithChildren,
	FollowersData,
	HumanServicesByIdData
} from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import i18n from "@/shared/i18n";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SubscribersFilterModal } from "./ui/subscribers-filter";
import { SubscribersInfo } from "./ui/subscribers-info";
import { SubscribersRecommendCategories } from "./ui/subscribers-recommend-categories";
import { SubscribersSubscribeSlider } from "./ui/subscribers-subscribe-slider";

export const SubscribersScreen = () => {
	const { t } = useTranslation();
	const currentLocale = i18n.language;
	const { colors, mode } = useAppTheme();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedSubscribeId, setSelectedSubscribeId] = useState<string>("");
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
	const [isUnsubscribeModalVisible, setIsUnsubscribeModalVisible] =
		useState<boolean>(false);
	const [dataService, setDataService] = useState<HumanServicesByIdData>();

	const [dataSubscribes, setDataSubscribers] = useState<FollowersData>();
	const [indexProfileSlider, setIndexProfileSlider] = useState(0);

	const [isFiltered, setIsFiltered] = useState(false);
	const [dataCategories, setDataCategories] =
		useState<CategoriesWithChildren[]>();

	const [statuses, setStatuses] = useState<string[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [regions, setRegions] = useState<string[]>([]);
	const [clearTrigger, setClearTrigger] = useState(false);

	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		categoriesService
			.getCategories({ parent: 1, lang: currentLocale })
			.then(setDataCategories);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const result = await servicesService.getServicesById(
				selectedSubscribeId,
				currentLocale
			);
			setDataService(result);
		};

		fetchData();

		console.log(selectedSubscribeId);
	}, [selectedSubscribeId]);

	useEffect(() => {
		// if (!isFiltered) return;

		const fetchData = async () => {
			const result = await servicesService.getFollowers({
				category_ids: categories.join(",") || undefined,
				statuses: statuses.join(",") || undefined,
				provinces: regions.join(",") || undefined,
				page: 1,
				lang: currentLocale
			});
			setDataSubscribers(result);
		};

		fetchData();
	}, [categories, statuses, regions]);

	const handleModalOpen = () => {
		setIsModalVisible(true);
	};

	const handleConfirmUnsubscribe = async () => {
		setIsUnsubscribeModalVisible(false);

		await servicesService.toggleFollowService({
			service_id: Number(selectedSubscribeId)
		});

		const fetchData = async () => {
			const result = await servicesService.getFollowers({
				category_ids: categories.join(",") || undefined,
				statuses: statuses.join(",") || undefined,
				provinces: regions.join(",") || undefined,
				page: 1,
				lang: currentLocale
			});
			setDataSubscribers(result);
		};

		fetchData();
	};

	const handleOpenUnsubscribeModal = () => {
		setIsUnsubscribeModalVisible(true);
	};

	const clearFilter = async () => {
		const empty = "";
		setIsFiltered(false);
		setStatuses([]);
		setCategories([]);
		setRegions([]);
		setClearTrigger(prev => !prev);
		setPage(1);
		setHasMore(true);

		const result = await servicesService.getFollowers({
			category_ids: empty,
			statuses: empty,
			provinces: empty,
			page: 1,
			lang: currentLocale
		});
		setDataSubscribers(result);
	};

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

		const result = await servicesService.getFollowers({
			category_ids: selectedCategories.join(",") || undefined,
			statuses: selectedStatuses.join(",") || undefined,
			provinces: selectedRegions.join(",") || undefined,
			page: 1,
			lang: currentLocale
		});
		setDataSubscribers(result);
		setIsModalVisible(false);
		setIndexProfileSlider(0);
	};

	return (
		<ScrollView style={[styles.safeArea, { backgroundColor: colors.bgPage }]}>
			<View style={styles.page}>
				<View style={[styles.header, { backgroundColor: colors.bgSubscriber }]}>
					<View style={styles.subscribersRow}>
						<Text style={[styles.subscribersTitle, { color: colors.text }]}>
							{dataSubscribes?.data.length}
						</Text>
						<Text style={[styles.subscribersText, { color: colors.text }]}>
							{t("subscribers")}
						</Text>
					</View>
					<SubscribersFilterModal.Button
						isModalVisible={isModalVisible}
						setIsModalVisible={handleModalOpen}
						categories={dataCategories}
						clearTrigger={clearTrigger}
						isFiltered={isFiltered}
						setIsFiltered={setIsFiltered}
						onFilterApply={handleFilterApply}
					/>
				</View>
				<SubscribersSubscribeSlider
					subscribe_id={selectedSubscribeId}
					onSelectSubCategory={setSelectedSubscribeId}
					dataSubscribers={dataSubscribes}
					index={indexProfileSlider}
					setIndex={setIndexProfileSlider}
				/>
				<SubscribersInfo
					handleOpenModal={handleOpenUnsubscribeModal}
					handleCloseModal={() => setIsUnsubscribeModalVisible(false)}
					isModalVisible={isUnsubscribeModalVisible}
					handleConfirm={handleConfirmUnsubscribe}
					data={dataService}
					dataSubscribersLength={dataSubscribes?.data.length}
				/>

				<View style={styles.subscribersCount}>
					<View style={styles.subscribersCountButton}>
						<Text
							style={[
								styles.subscribersCountText,
								{ color: colors.text },
								styles.subscribersCountTextActive
							]}
						>
							{indexProfileSlider + 1}
						</Text>
						<Text style={styles.subscribersCountText}>
							/ {dataSubscribes?.data.length} {t("subscriber")}
						</Text>
					</View>
				</View>
				<View style={styles.subscribersCountDivider} />

				<SubscribersRecommendCategories
					data={dataService}
					category_id={selectedCategoryId}
				/>
			</View>

			<SubscribersFilterModal.Modal
				isModalVisible={isModalVisible}
				setIsModalVisible={handleModalOpen}
				categories={dataCategories}
				clearTrigger={clearTrigger}
				isFiltered={isFiltered}
				setIsFiltered={setIsFiltered}
				onFilterApply={handleFilterApply}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1
	},
	page: {
		paddingVertical: 20,
		paddingBottom: 100
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 10,
		marginHorizontal: 16
	},
	subscribersRow: {
		flexDirection: "row",
		alignItems: "flex-end",
		gap: 4
	},
	subscribersTitle: {
		fontFamily: "Lexend-Medium",
		fontSize: 32,
		color: Colors.dark.secondary
	},
	subscribersText: {
		fontFamily: "Lexend-Medium",
		fontSize: 24,
		color: Colors.dark.secondary
	},

	subscribersCount: {
		marginTop: 20,
		marginBottom: 16,
		marginHorizontal: "auto",
		width: "50%"
	},
	subscribersCountButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#C0FFB9",
		borderRadius: 6,
		height: 35,
		width: "100%"
	},
	subscribersCountTextActive: {
		color: "#000000"
	},
	subscribersCountText: {
		fontFamily: "Lexend-Medium",
		fontSize: 16,
		textAlign: "center"
	},
	subscribersCountDivider: {
		width: "60%",
		height: 1,
		backgroundColor: "#0000001A",
		marginHorizontal: "auto",
		marginBottom: 21
	}
});