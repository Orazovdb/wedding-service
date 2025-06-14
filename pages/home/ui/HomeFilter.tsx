import { CategoriesWithChildren, statusServices } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import CheckedIconDark from "@/shared/icons/checked-dark.svg";
import CheckedIcon from "@/shared/icons/checked.svg";
import CloseIconDark from "@/shared/icons/close-icon-dark.svg";
import CloseIcon from "@/shared/icons/close-icon.svg";
import UncheckedIconDark from "@/shared/icons/unchecked-dark.svg";
import UncheckedIcon from "@/shared/icons/unchecked.svg";
import { useThemeMode } from "@/shared/store/ThemeContext";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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

interface HomeFilterModalProps {
	isModalVisible: boolean;
	setIsModalVisible: (val: boolean) => void;
	categories: CategoriesWithChildren[] | undefined;
	isFiltered: boolean;
	setIsFiltered: (val: boolean) => void;
	onFilterApply?: (args: {
		selectedStatuses?: string[];
		selectedCategories?: string[];
		selectedRegions?: string[];
	}) => void;
	clearTrigger: boolean;
}

const { width, height } = Dimensions.get("window");

const statusFilter = [
	{
		status: statusServices.NORMAL,
		title: "Normal"
	},
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
	const { t } = useTranslation();
	const { colors, mode } = useAppTheme();

	return (
		<TouchableOpacity
			style={[styles.filterButton, { borderColor: colors.text }]}
			onPress={() => props.setIsModalVisible(true)}
		>
			<View style={[styles.divider, { backgroundColor: colors.text }]} />
			<Text style={[styles.filterText, { color: colors.text }]}>
				{t("filter")}
			</Text>
		</TouchableOpacity>
	);
};

const HomeFilterModal = (props: HomeFilterModalProps) => {
	const { t } = useTranslation();
	const { colors } = useAppTheme();
	const { mode } = useThemeMode();

	const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

	useEffect(() => {
		setSelectedStatuses([]);
		setSelectedCategories([]);
		setSelectedRegions([]);
	}, [props.clearTrigger]);

	const toggleCheckboxStatus = (id: string) => {
		const identifier = `${id}`;
		setSelectedStatuses((prevItems: string[]) =>
			prevItems.includes(identifier)
				? prevItems.filter(id => id !== identifier)
				: [...prevItems, identifier]
		);
	};

	const toggleCheckboxCategories = (categoryId: string) => {
		const identifier = `${categoryId}`;
		setSelectedCategories((prevItems: string[]) =>
			prevItems.includes(identifier)
				? prevItems.filter(id => id !== identifier)
				: [...prevItems, identifier]
		);
	};

	const toggleCheckboxRegions = (region: string) => {
		setSelectedRegions((prevItems: string[]) =>
			prevItems.includes(region)
				? prevItems.filter(id => id !== region)
				: [...prevItems, region]
		);
	};

	const closeFilter = () => {
		props.setIsModalVisible(false);
		props.setIsFiltered(true);
		props.onFilterApply?.({
			selectedStatuses,
			selectedCategories,
			selectedRegions
		});
		if (
			selectedStatuses.length === 0 &&
			selectedCategories.length === 0 &&
			selectedRegions.length === 0
		) {
			props.setIsFiltered(false);
		}
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={props.isModalVisible}
			onRequestClose={closeFilter}
			style={{ backgroundColor: colors.bgPage }}
		>
			<View style={[styles.modalContainer, { backgroundColor: colors.bgPage }]}>
				<TouchableOpacity style={styles.closeButton} onPress={closeFilter}>
					{mode === "light" ? <CloseIcon /> : <CloseIconDark />}
					<Text style={[styles.closeButtonText, { color: colors.text }]}>
						{t("filter")}
					</Text>
				</TouchableOpacity>

				<ScrollView
					contentContainerStyle={[
						styles.modalContent,
						{ backgroundColor: colors.bgPage }
					]}
				>
					<View style={styles.categoryItemModal}>
						<View style={styles.categoryItemModalSection}>
							<Text
								style={[styles.categoryItemModalTitle, { color: colors.text }]}
							>
								{t("subscribers")}
							</Text>
							{statusFilter?.map((category, index) => (
								<TouchableOpacity
									key={category.status}
									style={[
										styles.categoryItemModalItem,
										index !== statusFilter.length - 1 && {
											marginBottom: 4
										}
									]}
									onPress={() => toggleCheckboxStatus(category.status)}
								>
									{selectedStatuses.includes(category.status) ? (
										mode === "light" ? (
											<CheckedIcon />
										) : (
											<CheckedIconDark />
										)
									) : mode === "light" ? (
										<UncheckedIcon />
									) : (
										<UncheckedIconDark />
									)}
									<Text
										style={[
											styles.categoryItemModalItemTitle,
											{ color: colors.text }
										]}
									>
										{category.title}
									</Text>
								</TouchableOpacity>
							))}
							<View
								style={[
									styles.categoryItemModalDivider,
									{ backgroundColor: colors.divider }
								]}
							/>
						</View>
						<View style={styles.categoryItemModalSection}>
							<Text
								style={[styles.categoryItemModalTitle, { color: colors.text }]}
							>
								{t("categories")}
							</Text>
							{props.categories?.map((category, index) => (
								<TouchableOpacity
									key={category.id}
									style={[
										styles.categoryItemModalItem,
										index !== category.children.length - 1 && {
											marginBottom: 4
										}
									]}
									onPress={() => toggleCheckboxCategories(String(category.id))}
								>
									{selectedCategories.includes(`${category.id}`) ? (
										mode === "light" ? (
											<CheckedIcon />
										) : (
											<CheckedIconDark />
										)
									) : mode === "light" ? (
										<UncheckedIcon />
									) : (
										<UncheckedIconDark />
									)}
									<Text
										style={[
											styles.categoryItemModalItemTitle,
											{ color: colors.text }
										]}
									>
										{category.name}
									</Text>
								</TouchableOpacity>
							))}
							<View
								style={[
									styles.categoryItemModalDivider,
									{ backgroundColor: colors.divider }
								]}
							/>
						</View>
						<View style={styles.categoryItemModalSection}>
							<Text
								style={[styles.categoryItemModalTitle, { color: colors.text }]}
							>
								{t("regions")}
							</Text>
							{regions?.map((region, index) => (
								<TouchableOpacity
									key={region.id}
									style={[
										styles.categoryItemModalItem,
										index !== regions.length - 1 && {
											marginBottom: 4
										}
									]}
									onPress={() => toggleCheckboxRegions(String(region.id))}
								>
									{selectedRegions.includes(`${region.id}`) ? (
										mode === "light" ? (
											<CheckedIcon />
										) : (
											<CheckedIconDark />
										)
									) : mode === "light" ? (
										<UncheckedIcon />
									) : (
										<UncheckedIconDark />
									)}
									<Text
										style={[
											styles.categoryItemModalItemTitle,
											{ color: colors.text }
										]}
									>
										{region.name}
									</Text>
								</TouchableOpacity>
							))}
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
		flexDirection: "row",
		gap: 10
	},
	divider: {
		width: 1,
		height: 20
	},
	filterText: {
		fontSize: 14,
		fontWeight: "400",
		textDecorationLine: "underline"
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: Platform.OS === "ios" ? 60 : 0
	},
	modalContent: {
		width: width,
		padding: 20,
		paddingVertical: 10,
		alignItems: "center",
		paddingBottom: 30
	},
	closeButton: {
		alignSelf: "flex-start",
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 4,
		marginHorizontal: 20
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
		marginBottom: 14
	},
	categoryItemModalItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	},
	categoryItemModalItemTitle: {
		fontSize: 14,
		fontFamily: "Lexend-Regular"
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
		marginTop: 24
	}
});
