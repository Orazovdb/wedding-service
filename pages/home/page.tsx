import SearchIcon from "@/components/ui/SearchIcon";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
	Dimensions,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View
} from "react-native";

import { categoriesService } from "@/shared/api/services/categories.service";
import { servicesService } from "@/shared/api/services/services.service";
import { CategoriesWithChildren, HumanServices } from "@/shared/api/types";
import { homeService } from "./home.service";
import { Home } from "./types";
import { HomeCategoriesSlider } from "./ui/HomeCategoriesSlider";
import { FilterModal } from "./ui/HomeFilter";
import { HomeMainBanner } from "./ui/HomeMainBanner";
import { HomeServices } from "./ui/HomeServices";

const { width } = Dimensions.get("window");

export const HomeScreen = () => {
	const [search, setSearch] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [data, setData] = useState<Home>();
	const [dataCategories, setDataCategories] =
		useState<CategoriesWithChildren[]>();
	const [dataServices, setDataServices] = useState<HumanServices[]>();

	useEffect(() => {
		const fetchData = async () => {
			const result = await categoriesService.getCategories({ parent: 1 });
			setDataCategories(result);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const result = await homeService.getHome();
			setData(result);
		};

		fetchData();
	}, []);

	const [statuses, setStatuses] = useState<string[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [regions, setRegions] = useState<string[]>([]);

	const handleFilterApply = ({
		selectedRegions,
		selectedStatuses,
		selectedCategories
	}: {
		selectedRegions?: string[];
		selectedStatuses?: string[];
		selectedCategories?: string[];
	}) => {
		setRegions(selectedRegions || []);
		setStatuses(selectedStatuses || []);
		setCategories(selectedCategories || []);
		fetchData();
	};

	const fetchData = async () => {
		const result = await servicesService.getServices({
			category_id: categories.join(","),
			status: statuses.join(","),
			province: regions.join(","),
			name: search
		});
		setDataServices(result);
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.home}>
					<View style={styles.searchBox}>
						<Text>
							{regions} {categories} {statuses} {search}
						</Text>
						<View
							style={[
								styles.inputContainer,
								{ borderColor: Colors.light.secondary }
							]}
						>
							<SearchIcon width={20} height={20} color="#000000" />
							<TextInput
								placeholder="Search"
								value={search}
								onChangeText={setSearch}
								style={styles.input}
								placeholderTextColor={Colors.light.secondary20}
							/>
							<FilterModal.Button
								isModalVisible={isModalVisible}
								setIsModalVisible={setIsModalVisible}
								categories={dataCategories}
								onFilterApply={handleFilterApply}
							/>
						</View>
					</View>

					<HomeMainBanner data={data} />

					<HomeCategoriesSlider />

					<HomeServices data={data} />
				</View>
			</ScrollView>
			<FilterModal.Modal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
				categories={dataCategories}
				onFilterApply={handleFilterApply}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: { flex: 1, backgroundColor: Colors.light.white },
	scrollContainer: { flexGrow: 1 },
	home: {
		width: width,
		paddingBottom: 50
	},
	searchBox: {
		paddingHorizontal: 20
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		paddingVertical: 5,
		borderWidth: 2,
		borderRadius: 8,
		backgroundColor: "white",
		paddingHorizontal: 10,
		marginTop: 16,
		marginBottom: 20
	},
	input: { flex: 1, fontSize: 14, paddingVertical: 8, marginLeft: 8 }
});
