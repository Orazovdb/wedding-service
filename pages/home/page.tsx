import SearchIcon from "@/components/ui/SearchIcon";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
	Dimensions,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TextInput,
	View
} from "react-native";
import { FilterModal } from "../categories-detail/ui/categories-filter";
import { HomeCategoriesSlider } from "./ui/HomeCategoriesSlider";
import { HomeMainBanner } from "./ui/HomeMainBanner";
import { HomeServices } from "./ui/HomeServices";

const { width } = Dimensions.get("window");

export const HomeScreen = () => {
	const [search, setSearch] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.home}>
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
						/>
					</View>

					<HomeMainBanner />

					<HomeCategoriesSlider />

					<HomeServices />
				</View>
			</ScrollView>
			<FilterModal.Modal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: { flex: 1, backgroundColor: Colors.light.white },
	scrollContainer: { flexGrow: 1 },
	home: {
		width: width,
		paddingHorizontal: 30,
		paddingBottom: 50
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
