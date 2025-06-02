import SearchIcon from "@/components/ui/SearchIcon";
import { categoriesService } from "@/shared/api/services/categories.service";
import { CategoriesWithChildren, HumanServices } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import i18n from "@/shared/i18n";
import ArrowLeftDark from "@/shared/icons/arrow-left-dark.svg";
import ArrowLeft from "@/shared/icons/arrow-left.svg";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FilterModal } from "./categories-filter";

interface Props {
	category_id: string | string[];
	sub_category_id: string | string[];
	onSelectSubCategory: (id: string) => void;
	data: HumanServices | undefined;
	totalCount: number | undefined;
	categories: CategoriesWithChildren[] | undefined;
	isFiltered: boolean;
	setIsFiltered: (val: boolean) => void;
	onFilterApply?: (args: {
		selectedStatuses?: string[];
		selectedCategories?: string[];
		selectedRegions?: string[];
	}) => void;
	clearTrigger: boolean;
	isModalVisible: boolean;
	setIsModalVisible: (isModalVisible: boolean) => void;
	search: string;
	setSearch: (val: string) => void;
}

export const CategoriesDetailHeader = (props: Props) => {
	const currentLang = i18n.language;
	const router = useRouter();
	const { search, setSearch } = props;
	const { colors, mode } = useAppTheme();

	const [dataCategories, setDataCategories] =
		useState<CategoriesWithChildren[]>();

	useEffect(() => {
		const fetchData = async () => {
			const result = await categoriesService.getCategories({
				category_id: String(props.category_id),
				parent: 0,
				lang: currentLang
			});
			setDataCategories(result);
		};

		fetchData();
	}, []);

	return (
		<View style={styles.header}>
			<View style={styles.categoryBlock}>
				<TouchableOpacity onPress={() => router.back()}>
					{mode === "light" ? <ArrowLeft /> : <ArrowLeftDark />}
				</TouchableOpacity>
				<Text style={[styles.categoryName, { color: colors.text }]}>
					{
						props.data?.categories.find(
							item => String(item.id) === String(props.category_id)
						)?.name
					}{" "}
					{props.sub_category_id !== "all" ? "/" : null}{" "}
					{
						props.data?.categories.find(
							item => String(item.id) === String(props.sub_category_id)
						)?.name
					}
				</Text>
				<View
					style={[
						styles.categoryService,
						{ backgroundColor: colors.textTotalCount }
					]}
				>
					<View
						style={[
							styles.categoryServiceDot,
							{ backgroundColor: colors.textReverse }
						]}
					/>
					<Text
						style={[styles.categoryServiceName, { color: colors.textReverse }]}
					>
						{props.totalCount}
					</Text>
				</View>
			</View>
			<View style={styles.searchBlock}>
				<View style={[styles.inputContainer, { borderColor: colors.text }]}>
					<SearchIcon width={20} height={20} color={colors.text} />
					<TextInput
						placeholder=""
						value={search}
						onChangeText={setSearch}
						style={styles.input}
						placeholderTextColor={Colors.light.secondary20}
					/>
				</View>
				<FilterModal.Button
					isModalVisible={props.isModalVisible}
					setIsModalVisible={props.setIsModalVisible}
					categories={props.categories}
					clearTrigger={props.clearTrigger}
					isFiltered={props.isFiltered}
					setIsFiltered={props.setIsFiltered}
					onFilterApply={props.onFilterApply}
				/>
			</View>
			<View style={styles.categoryList}>
				<FlatList
					data={dataCategories}
					keyExtractor={item => item.id.toString()}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={[
								styles.categoryItem,
								{
									backgroundColor: colors.textReverse,
									borderColor: colors.text,
									borderWidth: 1
								},
								props.sub_category_id === String(item.id)
									? {
											backgroundColor: colors.text
									  }
									: null
							]}
							onPress={() => props.onSelectSubCategory(String(item.id))}
						>
							<Text
								style={[
									{ color: colors.text },
									props.sub_category_id === String(item.id)
										? { color: colors.textReverse }
										: null
								]}
							>
								{item.name}
							</Text>
						</TouchableOpacity>
					)}
				/>
			</View>
			<FilterModal.Modal
				isModalVisible={props.isModalVisible}
				setIsModalVisible={props.setIsModalVisible}
				categories={props.categories}
				clearTrigger={props.clearTrigger}
				isFiltered={props.isFiltered}
				setIsFiltered={props.setIsFiltered}
				onFilterApply={props.onFilterApply}
			/>
		</View>
	);
};

export const styles = StyleSheet.create({
	header: {},
	categoryBlock: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingHorizontal: 20
	},
	categoryName: {
		fontFamily: "Lexend-SemiBold",
		fontSize: 16
	},
	categoryService: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 6,
		paddingVertical: 2,
		paddingHorizontal: 6,
		gap: 4
	},
	categoryServiceDot: {
		width: 8,
		height: 8,
		borderRadius: 8 / 2
	},
	categoryServiceName: { fontFamily: "Lexend-Regular", fontSize: 14 },

	searchBlock: {
		flexDirection: "row",
		alignItems: "center",
		gap: 14,
		width: "100%",
		paddingHorizontal: 20
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		marginTop: 14,
		marginBottom: 12,
		flex: 1
	},
	input: {
		flex: 1,
		fontSize: 14,
		paddingVertical: 8,
		marginLeft: 8,
		height: 33
	},

	categoryList: {
		marginBottom: 12,
		paddingLeft: 20
	},
	categoryItem: {
		height: 33,
		minWidth: 77,
		borderRadius: 4,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
		paddingHorizontal: 10
	},
	categoryItemActive: {
		backgroundColor: "#000000"
	},
	categoryItemText: {
		color: "#000"
	},
	categoryItemTextActive: {
		color: "#FFF"
	}
});
