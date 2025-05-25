import { categoriesService } from "@/shared/api/services/categories.service";
import { servicesService } from "@/shared/api/services/services.service";
import { CategoriesWithChildren, HumanServicesData } from "@/shared/api/types";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CategoriesDetailHeader } from "./ui/categories-detail-header";
import { CategoryServices } from "./ui/category-services";

export const CategoriesDetailScreen = () => {
	const { categoryDetail, id } = useLocalSearchParams<{
		categoryDetail: string;
		id: string;
	}>();

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
		null
	);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [dataServices, setDataServices] = useState<HumanServicesData>();
	const [dataCategories, setDataCategories] = useState<
		CategoriesWithChildren[]
	>([]);
	const [regions, setRegions] = useState<string[]>([]);
	const [statuses, setStatuses] = useState<string[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [isFiltered, setIsFiltered] = useState(false);
	const [clearTrigger, setClearTrigger] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		if (categoryDetail && id) {
			setSelectedCategory(categoryDetail);
			setSelectedSubCategory(id);
		}
	}, [categoryDetail, id]);

	useEffect(() => {
		if (!selectedCategory || !selectedSubCategory) return;

		const fetchData = async () => {
			const result = await servicesService.getServices({
				category_ids: selectedCategory,
				subcategory_ids:
					selectedSubCategory === "all" ? undefined : selectedSubCategory,
				statuses: statuses.join(",") || undefined,
				provinces: regions.join(",") || undefined,
				name: search || undefined,
				page,
				limit: 100
			});

			if (page === 1) {
				setDataServices(result);
			} else {
				setDataServices(prev =>
					prev
						? {
								...result,
								data: [
									...new Map(
										[...prev.data, ...result.data].map(item => [item.id, item])
									).values()
								]
						  }
						: result
				);
			}

			setHasMore(
				result.meta.current_page <
					Math.ceil(result.meta.total / (result?.meta?.limit || 1))
			);
		};

		fetchData();
	}, [page, search, statuses, regions, selectedCategory, selectedSubCategory]);

	useEffect(() => {
		setPage(1);
	}, [search, statuses, regions, selectedCategory]);

	const handleFilterApply = useCallback(
		async ({
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
				page: 1
			});

			setDataServices(result);
		},
		[search]
	);

	useEffect(() => {
		if (!selectedCategory) return;
		categoriesService
			.getCategories({ parent: 0, category_id: selectedCategory })
			.then(setDataCategories);
	}, []);

	if (!selectedCategory || !selectedSubCategory) {
		return <Text>Loading category data...</Text>;
	}

	return (
		<View style={styles.safeArea}>
			<View style={styles.page}>
				<CategoriesDetailHeader
					category_id={selectedCategory}
					sub_category_id={selectedSubCategory}
					onSelectSubCategory={setSelectedSubCategory}
					data={dataServices?.data[0]}
					totalCount={dataServices?.meta.total}
					categories={dataCategories}
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					onFilterApply={handleFilterApply}
					setIsFiltered={setIsFiltered}
					isFiltered={isFiltered}
					clearTrigger={clearTrigger}
				/>
				{dataServices && (
					<CategoryServices page={page} setPage={setPage} data={dataServices} />
				)}
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#fff"
	},
	page: {
		flex: 1,
		height: "100%",
		paddingTop: 10
	}
});
