import { Colors } from "@/constants/Colors";
import { CategoriesWithChildren, statusServices } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import CheckedIconDark from "@/shared/icons/checked-dark.svg";
import CheckedIcon from "@/shared/icons/checked.svg";
import CloseIconDark from "@/shared/icons/close-icon-dark.svg";
import CloseIcon from "@/shared/icons/close-icon.svg";
import IconFilter from "@/shared/icons/filter-subscribers-icon.svg";
import UncheckedIconDark from "@/shared/icons/unchecked-dark.svg";
import UncheckedIcon from "@/shared/icons/unchecked.svg";
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

type SubscribersFilterProps = {
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
};

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

const { width, height } = Dimensions.get("window");

const SubscribersFilterButton = (props: SubscribersFilterProps) => {
	const { t } = useTranslation();
	return (
		<TouchableOpacity
			style={styles.filterButton}
			onPress={() => props.setIsModalVisible(true)}
		>
			<Text style={styles.filterText}>{t("filter")}</Text>
			<IconFilter />
		</TouchableOpacity>
	);
};

const SubscribersDetailFilter = (props: SubscribersFilterProps) => {
	const { t } = useTranslation();
	const { colors, mode } = useAppTheme();

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
		const hasFilters =
			selectedStatuses.length > 0 ||
			selectedCategories.length > 0 ||
			selectedRegions.length > 0;

		props.onFilterApply?.({
			selectedStatuses,
			selectedCategories,
			selectedRegions
		});

		props.setIsFiltered(hasFilters);
		props.setIsModalVisible(false);
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={props.isModalVisible}
			onRequestClose={closeFilter}
		>
			<View style={styles.modalContainer}>
				<ScrollView
					contentContainerStyle={[
						styles.modalContent,
						{ backgroundColor: colors.bgPage }
					]}
				>
					<TouchableOpacity style={styles.closeButton} onPress={closeFilter}>
						{mode === "light" ? <CloseIcon /> : <CloseIconDark />}
						<Text style={[styles.closeButtonText, { color: colors.text }]}>
							{t("filter")}
						</Text>
					</TouchableOpacity>

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
							<View style={styles.categoryItemModalDivider} />
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
							<View style={styles.categoryItemModalDivider} />
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
							<View style={styles.categoryItemModalDivider} />
						</View>
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
		alignItems: "center",
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
		justifyContent: "center",
		alignItems: "center"
	},
	modalContent: {
		width: width,
		height: height,
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
