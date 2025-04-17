import { useLocalSearchParams } from "expo-router"
import React from "react"
import { Text, View } from "react-native"

const CategoriesDetailScreen = () => {
	const { categories_detail, id } = useLocalSearchParams();

	return (
		<View>
			<Text>
				Categories-detail categories_detail is: {categories_detail} id: {id}
			</Text>
		</View>
	);
};

export default CategoriesDetailScreen;
