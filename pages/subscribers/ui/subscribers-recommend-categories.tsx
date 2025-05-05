import IconRestaurant from "@/shared/icons/restaurant-icon.svg";
import React from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { CategoryData } from "../data";

interface Props {
	category_id: string | string[];
	onSelectCategory: (id: string) => void;
}

export const SubscribersRecommendCategories = (props: Props) => {
	return (
		<View style={styles.recommendCategories}>
			<Text style={styles.recommendCategoriesTitle}>
				Teklip berilýän kategoriýalar
			</Text>
			<FlatList
				data={CategoryData}
				keyExtractor={item => item.id}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={[
							styles.categoryItem,
							props.category_id === item.id ? styles.categoryItemActive : null
						]}
						onPress={() => props.onSelectCategory(item.id)}
					>
						<IconRestaurant />
						<Text
							style={[
								styles.categoryItemText,
								props.category_id === item.id
									? styles.categoryItemTextActive
									: null
							]}
						>
							{item.title}
						</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export const styles = StyleSheet.create({
	recommendCategories: {
		marginLeft: 16
	},
	recommendCategoriesTitle: {
		fontSize: 16,
		fontFamily: "Lexend-Regular",
		color: "#000000",
		marginBottom: 26
	},

	categoryList: {
		marginBottom: 12,
		paddingLeft: 20
	},
	categoryItem: {
		backgroundColor: "#0000001A",
		height: 35,
		minWidth: 77,
		borderRadius: 6,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		marginRight: 10,
		paddingHorizontal: 6
	},
	categoryItemActive: {
		backgroundColor: "#000000"
	},
	categoryItemText: {
		color: "#000000",
		fontFamily: "Lexend-Light",
		fontSize: 14
	},
	categoryItemTextActive: {
		color: "#FFF"
	}
});
