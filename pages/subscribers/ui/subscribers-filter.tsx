import { Colors } from "@/constants/Colors";
import CheckedIcon from "@/shared/icons/checked.svg";
import CloseIcon from "@/shared/icons/close-icon.svg";
import IconFilter from "@/shared/icons/filter-subscribers-icon.svg";
import UncheckedIcon from "@/shared/icons/unchecked.svg";
import React, { useState } from "react";
import {
	Dimensions,
	Modal,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { HomeFilterModalData } from "../../home/data";

type SubscribersFilterProps = {
	isModalVisible: boolean;
	setIsModalVisible: () => void;
};

const { width, height } = Dimensions.get("window");

const SubscribersFilterButton = (props: SubscribersFilterProps) => {
	return (
		<TouchableOpacity
			style={styles.filterButton}
			onPress={ props.setIsModalVisible}
		>
			<Text style={styles.filterText}>Фильтр</Text>
			<IconFilter />
		</TouchableOpacity>
	);
};

const SubscribersDetailFilter = (props: SubscribersFilterProps) => {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const toggleCheckbox = (categoryId: string, itemId: string) => {
		const identifier = `${categoryId}_${itemId}`;
		setSelectedItems((prevItems: string[]) =>
			prevItems.includes(identifier)
				? prevItems.filter(id => id !== identifier)
				: [...prevItems, identifier]
		);
	};
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={props.isModalVisible}
			onRequestClose={props.setIsModalVisible}
		>
			<View style={styles.modalContainer}>
				<ScrollView contentContainerStyle={styles.modalContent}>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={props.setIsModalVisible}
					>
						<CloseIcon />
						<Text style={styles.closeButtonText}>Filter</Text>
					</TouchableOpacity>

					<View style={styles.categoryItemModal}>
						{HomeFilterModalData.map((category, index) => (
							<View key={category.id} style={styles.categoryItemModalSection}>
								<Text style={styles.categoryItemModalTitle}>
									{category.title}
								</Text>
								{category.items.map((item, index) => (
									<TouchableOpacity
										key={item.id}
										style={[
											styles.categoryItemModalItem,
											index !== category.items.length - 1 && { marginBottom: 4 }
										]}
										onPress={() => toggleCheckbox(category.id, item.id)}
									>
										{selectedItems.includes(`${category.id}_${item.id}`) ? (
											<CheckedIcon />
										) : (
											<UncheckedIcon />
										)}
										<Text style={styles.categoryItemModalItemTitle}>
											{item.title}
										</Text>
									</TouchableOpacity>
								))}
								{index !== HomeFilterModalData.length - 1 && (
									<View style={styles.categoryItemModalDivider} />
								)}
							</View>
						))}
					</View>
				</ScrollView>
			</View>
		</Modal>
	);
};

export const SubscribersFilterModal = {
	Modal: SubscribersDetailFilter,
	Button: SubscribersFilterButton
};

export const styles = StyleSheet.create({
	filterButton: {
		paddingVertical: 4,
		paddingHorizontal: 6,
		flexDirection: "row",
		gap: 4,
		backgroundColor: "#0000004D",
		borderRadius: 6
	},
	filterText: {
		color: Colors.light.white,
		fontSize: 16,
		fontFamily: "Lexend-Regular"
	},
	modalContainer: {
		flex: 1,
		backgroundColor: Colors.light.white,
		justifyContent: "center",
		alignItems: "center"
	},
	modalContent: {
		width: width,
		height: height,
		backgroundColor: "white",
		padding: 20,
		paddingTop: Platform.OS === "ios" ? 60 : 0,
		alignItems: "center"
	},
	closeButton: {
		alignSelf: "flex-start",
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 4
	},
	closeButtonText: {
		fontSize: 16,
		fontFamily: "Lexend-SemiBold"
	},
	categoryItemModal: {
		width: "80%",
		borderRadius: 5
	},
	categoryItemModalSection: {
		paddingVertical: 14
	},
	categoryItemModalTitle: {
		fontSize: 14,
		fontFamily: "Lexend-Bold",
		color: Colors.light.secondary,
		marginBottom: 14
	},
	categoryItemModalItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	},
	categoryItemModalItemTitle: {
		fontSize: 14,
		fontFamily: "Lexend-Regular",
		color: Colors.light.secondary
	},
	checkboxIcon: {
		width: 24,
		height: 24,
		marginRight: 10
	},
	categoryItemModalDivider: {
		width: "70%",
		marginHorizontal: "auto",
		height: 1,
		backgroundColor: "#E3E3E3",
		marginTop: 24
	}
});
