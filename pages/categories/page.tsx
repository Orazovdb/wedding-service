import { Colors } from "@/constants/Colors";
import { categoriesService } from "@/shared/api/services/categories.service";
import { CategoriesWithChildren } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import i18n from "@/shared/i18n";
import ArrowRightIconDark from "@/shared/icons/arrow-right-dark.svg";
import ArrowRightIcon from "@/shared/icons/arrow-right.svg";
import NavBottomIconDark from "@/shared/icons/nav-bottom-dark.svg";
import NavBottomIcon from "@/shared/icons/nav-bottom.svg";

import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Animated,
	Dimensions,
	Easing,
	FlatList,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";

const { width } = Dimensions.get("window");

export const CategoriesScreen = () => {
	const currentLang = i18n.language;
	const { t } = useTranslation();
	const { colors, mode } = useAppTheme();
	const [openItemId, setOpenItemId] = useState<number | null>(null);
	const animatedOpacity = useRef(new Animated.Value(0)).current;
	const router = useRouter();
	const [dataCategories, setDataCategories] =
		useState<CategoriesWithChildren[]>();

	useEffect(() => {
		const fetchData = async () => {
			const result = await categoriesService.getCategories({
				parent: 1,
				lang: currentLang
			});
			setDataCategories(result);
		};

		fetchData();
	}, []);

	const toggleDropdown = (id: number) => {
		const isOpen = openItemId === id;
		setOpenItemId(isOpen ? null : id);

		Animated.timing(animatedOpacity, {
			toValue: isOpen ? 0 : 1,
			duration: 300,
			easing: Easing.ease,
			useNativeDriver: true
		}).start();
	};

	const handlePush = (id: number, subId: number) => {
		router.push(`/categories/${id}/${subId}`);
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={[styles.page, { backgroundColor: colors.bgPage }]}>
				<Text style={[styles.title, { color: colors.text }]}>
					{t("categories")}
				</Text>
				<FlatList
					data={dataCategories}
					keyExtractor={item => item.id.toString()}
					style={{ height: "100%" }}
					renderItem={({ item }) => (
						<View style={styles.items}>
							<View key={item.id} style={styles.dropdownItem}>
								<TouchableOpacity
									onPress={() => toggleDropdown(item.id)}
									style={styles.item}
								>
									<View style={styles.itemTitleWrapper}>
										<View style={styles.iconWrapper}>
											<Image source={{ uri: item.icon }} style={styles.icon} />
										</View>
										<Text style={[styles.itemTitle, { color: colors.text }]}>
											{item.name}
										</Text>
									</View>
									{mode === "light" ? <NavBottomIcon /> : <NavBottomIconDark />}
								</TouchableOpacity>

								{openItemId === item.id && (
									<Animated.View
										style={[
											styles.subItemsContainer,
											{ opacity: animatedOpacity },
											{ borderLeftColor: colors.text }
										]}
									>
										<TouchableOpacity
											style={[
												styles.subItem,
												{ backgroundColor: colors.bgCategoryItem }
											]}
											onPress={() => router.push(`/categories/${item.id}/all`)}
										>
											<Text
												style={[styles.subItemText, { color: colors.text }]}
											>
												{t("all")}
											</Text>
											{mode === "light" ? (
												<ArrowRightIcon />
											) : (
												<ArrowRightIconDark />
											)}
										</TouchableOpacity>
										{item.children.map(subItem => (
											<TouchableOpacity
												key={subItem.id}
												style={[
													styles.subItem,
													{ backgroundColor: colors.bgCategoryItem }
												]}
												onPress={() => handlePush(item.id, subItem.id)}
											>
												<Text
													style={[
														[styles.subItemText, { color: colors.text }],
														{ color: colors.text }
													]}
												>
													{subItem.name}
												</Text>
												{mode === "light" ? (
													<ArrowRightIcon />
												) : (
													<ArrowRightIconDark />
												)}
											</TouchableOpacity>
										))}
									</Animated.View>
								)}
							</View>
						</View>
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

export const styles = StyleSheet.create({
	safeArea: { flex: 1, backgroundColor: Colors.light.white },
	page: {
		width: width,
		paddingHorizontal: 24,
		paddingTop: 10,
		paddingBottom: 50
	},
	title: {
		fontFamily: "Lexend-SemiBold",
		fontSize: 16,
		marginBottom: 20
	},

	items: {},
	dropdownItem: {
		position: "relative",
		marginVertical: 2
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 2,
		paddingRight: 12
	},
	itemTitleWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 4
	},
	iconWrapper: {
		width: 27,
		height: 27,
		borderRadius: 25 / 2,
		backgroundColor: Colors.light.primary,
		justifyContent: "center",
		alignItems: "center"
	},
	icon: {
		width: 27,
		height: 27,
		borderRadius: 25 / 2
	},
	itemTitle: { fontSize: 14, fontFamily: "Lexend-Regular" },
	subItemsContainer: {
		overflow: "hidden",
		marginLeft: 13.5,
		marginVertical: 10,
		paddingLeft: 18,
		borderLeftWidth: 1,
		position: "relative",
		width: "84%",
		gap: 10
	},
	subItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 14,
		borderRadius: 4,
		paddingVertical: 0
	},
	subItemText: {
		fontSize: 14,
		color: Colors.light.secondary,
		paddingVertical: 4,
		fontFamily: "Lexend-Light",
		lineHeight: 14
	}
});
