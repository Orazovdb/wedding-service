import SearchIcon from "@/components/ui/SearchIcon";
import ArrowLeft from "@/shared/icons/arrow-left.svg";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { CategoryData } from "../data";
import { FilterModal } from "./categories-filter";

interface Props {
	sub_category_id: string | string[];
	category_id: string | string[];
	onSelectSubCategory: (id: string) => void;
}

export const CategoriesDetailHeader = (props: Props) => {
	const router = useRouter();
	const [search, setSearch] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);

	return (
		<View style={styles.header}>
			<View style={styles.categoryBlock}>
				<TouchableOpacity onPress={() => router.back()}>
					<ArrowLeft />
				</TouchableOpacity>
				<Text style={styles.categoryName}>Maşyn Arenda / BMW</Text>
				<View style={styles.categoryService}>
					<View style={styles.categoryServiceDot} />
					<Text style={styles.categoryServiceName}>14 Hyzmatcy</Text>
				</View>
			</View>
			<View style={styles.searchBlock}>
				<View
					style={[
						styles.inputContainer,
						{ borderColor: Colors.light.secondary }
					]}
				>
					<SearchIcon width={20} height={20} color="#000000" />
					<TextInput
						placeholder="Maşyn prokadçylary gözle"
						value={search}
						onChangeText={setSearch}
						style={styles.input}
						placeholderTextColor={Colors.light.secondary20}
					/>
				</View>
				<FilterModal.Button
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
				/>
			</View>
			<View style={styles.categoryList}>
				<FlatList
					data={CategoryData}
					keyExtractor={item => item.id}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={[
								styles.categoryItem,
								props.sub_category_id === item.id
									? styles.categoryItemActive
									: null
							]}
							onPress={() => props.onSelectSubCategory(item.id)}
						>
							<Text
								style={[
									styles.categoryItemText,
									props.sub_category_id === item.id
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
			<FilterModal.Modal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
			/>
		</View>
	);
};

export const styles = StyleSheet.create({
	header: {
	},
	categoryBlock: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingHorizontal: 20
	},
	categoryName: {
		fontFamily: "Lexend-SemiBold",
		fontSize: 16,
		color: "#000"
	},
	categoryService: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#0000001A",
		borderRadius: 6,
		paddingVertical: 2,
		paddingHorizontal: 6,
		gap: 4
	},
	categoryServiceDot: {
		width: 8,
		height: 8,
		borderRadius: 8 / 2,
		backgroundColor: "#000"
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
		backgroundColor: "white",
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
		backgroundColor: "#FFF",
		height: 33,
		minWidth: 77,
		borderRadius: 4,
		borderColor: "#000",
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
