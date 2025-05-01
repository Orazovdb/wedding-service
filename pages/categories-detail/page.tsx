import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CategoriesDetailHeader } from "./ui/categories-detail-header";
import { CategoryServices } from "./ui/category-services";

export const CategoriesDetailScreen = () => {
	const { categories_detail, id } = useLocalSearchParams();
	const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>(
		id as string
	);

	return (
		<View style={styles.safeArea}>
			<View style={styles.page}>
				<CategoriesDetailHeader
					category_id={categories_detail}
					sub_category_id={selectedSubCategoryId}
					onSelectSubCategory={setSelectedSubCategoryId}
				/>
				<CategoryServices />
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
