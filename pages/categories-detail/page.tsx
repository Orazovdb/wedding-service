import { servicesService } from "@/shared/api/services/services.service";
import { HumanServicesData } from "@/shared/api/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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
	const [categories, setCategories] = useState<string[]>([]);
	const [regions, setRegions] = useState<string[]>([]);
	const [statuses, setStatuses] = useState<string[]>([]);
	const [isFiltered, setIsFiltered] = useState(false);

	// Sync state from route params once ready
	useEffect(() => {
		if (categoryDetail && id) {
			setSelectedCategory(categoryDetail);
			setSelectedSubCategory(id);
		}
		console.log(categoryDetail, id);
	}, [categoryDetail, id]);

	// Fetch data when inputs are ready
	useEffect(() => {
		if (!selectedCategory || !selectedSubCategory) return;

		const fetchData = async () => {
			const result = await servicesService.getServices({
				category_ids: selectedCategory,
				subcategory_ids: selectedSubCategory,
				statuses: statuses.join(",") || undefined,
				provinces: regions.join(",") || undefined,
				name: search || undefined,
				page
			});

			if (page === 1) {
				setDataServices(result);
			} else {
				setDataServices(prev =>
					prev ? { ...result, data: [...prev.data, ...result.data] } : result
				);
			}

			setHasMore(result.data.length >= result.meta.per_page);
		};

		fetchData();
	}, [page, search, statuses, regions, selectedCategory, selectedSubCategory]);

	useEffect(() => {
		setPage(1);
	}, [search, statuses, regions, selectedCategory]);

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
				/>
				<CategoryServices
					data={dataServices}
					onPageChange={(nextPage: number) => {
						if (nextPage !== page && hasMore && !loadingMore) {
							setPage(nextPage);
						}
					}}
				/>
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
