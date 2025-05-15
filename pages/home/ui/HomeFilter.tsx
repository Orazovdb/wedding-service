import { Colors } from "@/constants/Colors";
import { CategoriesWithChildren, statusServices } from "@/shared/api/types";
import CheckedIcon from "@/shared/icons/checked.svg";
import CloseIcon from "@/shared/icons/close-icon.svg";
import IconFilter from "@/shared/icons/filter-icon.svg";
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
import { regions } from "../data";

type HomeFilterModalProps = {
	isModalVisible: boolean;
	setIsModalVisible: (isModalVisible: boolean) => void;
	categories?: CategoriesWithChildren[];
};

const { width, height } = Dimensions.get("window");

const statusFilter = [
	{
		status: statusServices.NEW,
		title: "Täze"
	},
	{
		status: statusServices.PREMIUM,
		title: "Premium"
	},
	{
		status: statusServices.GOLDEN,
		title: "Gold"
	}
];

const HomeFilterButton = (props: HomeFilterModalProps) => {
	return (
		<TouchableOpacity
			style={styles.filterButton}
			onPress={() => props.setIsModalVisible(true)}
		>
			<IconFilter />
		</TouchableOpacity>
	);
};

const HomeFilterModal = (props: HomeFilterModalProps) => {
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
			onRequestClose={() => props.setIsModalVisible(false)}
		>
			<View style={styles.modalContainer}>
				<ScrollView contentContainerStyle={styles.modalContent}>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={() => props.setIsModalVisible(false)}
					>
						<CloseIcon />
						<Text style={styles.closeButtonText}>Filter</Text>
					</TouchableOpacity>

					<View style={styles.categoryItemModal}>
						<View style={styles.categoryItemModalSection}>
							<Text style={styles.categoryItemModalTitle}>Agzalar</Text>
							{statusFilter?.map((category, index) => (
								<TouchableOpacity
									key={category.status}
									style={[
										styles.categoryItemModalItem,
										index !== statusFilter.length - 1 && {
											marginBottom: 4
										}
									]}
									onPress={() =>
										toggleCheckbox(
											String(category.status),
											String(category.status)
										)
									}
								>
									{selectedItems.includes(
										`${category.status}_${category.status}`
									) ? (
										<CheckedIcon />
									) : (
										<UncheckedIcon />
									)}
									<Text style={styles.categoryItemModalItemTitle}>
										{category.title}
									</Text>
								</TouchableOpacity>
							))}
							<View style={styles.categoryItemModalDivider} />
						</View>
						<View style={styles.categoryItemModalSection}>
							<Text style={styles.categoryItemModalTitle}>Kategoriýalar</Text>
							{props.categories?.map((category, index) => (
								<TouchableOpacity
									key={category.id}
									style={[
										styles.categoryItemModalItem,
										index !== category.children.length - 1 && {
											marginBottom: 4
										}
									]}
									onPress={() =>
										toggleCheckbox(String(category.id), String(category.id))
									}
								>
									{selectedItems.includes(`${category.id}_${category.id}`) ? (
										<CheckedIcon />
									) : (
										<UncheckedIcon />
									)}
									<Text style={styles.categoryItemModalItemTitle}>
										{category.name}
									</Text>
								</TouchableOpacity>
							))}
							<View style={styles.categoryItemModalDivider} />
						</View>
						<View style={styles.categoryItemModalSection}>
							<Text style={styles.categoryItemModalTitle}>Regionlar</Text>
							{regions?.map((region, index) => (
								<TouchableOpacity
									key={region.id}
									style={[
										styles.categoryItemModalItem,
										index !== regions.length - 1 && {
											marginBottom: 4
										}
									]}
									onPress={() =>
										toggleCheckbox(String(region.id), String(region.id))
									}
								>
									{selectedItems.includes(`${region.id}_${region.id}`) ? (
										<CheckedIcon />
									) : (
										<UncheckedIcon />
									)}
									<Text style={styles.categoryItemModalItemTitle}>
										{region.name}
									</Text>
								</TouchableOpacity>
							))}
							<View style={styles.categoryItemModalDivider} />
						</View>
					</View>
				</ScrollView>
			</View>
		</Modal>
	);
};

export const FilterModal = {
	Modal: HomeFilterModal,
	Button: HomeFilterButton
};

export const styles = StyleSheet.create({
	filterButton: {
		paddingVertical: 3,
		borderColor: Colors.light.secondary
	},
	filterText: {
		color: Colors.light.secondary,
		fontSize: 14,
		fontWeight: "400",
		textDecorationLine: "underline"
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
		backgroundColor: "#00000033",
		marginTop: 24
	}
});
