import { Colors } from "@/constants/Colors";
import ArrowRightIcon from "@/shared/icons/arrow-right.svg";
import NavBottomIcon from "@/shared/icons/nav-bottom.svg";
import WeddingRestaurantIcon from "@/shared/icons/wedding-restaurant.svg";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	Easing,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { items } from "./data";

const { width } = Dimensions.get("window");

export const CategoriesScreen = () => {
	const [openItemId, setOpenItemId] = useState<number | null>(null);
	const animatedOpacity = useRef(new Animated.Value(0)).current;
	const router = useRouter();

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

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.page}>
				<Text style={styles.title}>Kategoriýalar</Text>
				<FlatList
					data={items}
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
										<View style={styles.icon}>
											<WeddingRestaurantIcon />
										</View>
										<Text style={styles.itemTitle}>{item.title}</Text>
									</View>
									<NavBottomIcon />
								</TouchableOpacity>

								{openItemId === item.id && (
									<Animated.View
										style={[
											styles.subItemsContainer,
											{ opacity: animatedOpacity }
										]}
									>
										{item.subItems.map(subItem => (
											<TouchableOpacity
												key={subItem.id}
												style={styles.subItem}
												onPress={() =>
													router.push(`/categories/${item.id}/${subItem.id}`)
												}
											>
												<Text style={styles.subItemText}>{subItem.title}</Text>
												<ArrowRightIcon />
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
	icon: {
		width: 27,
		height: 27,
		borderRadius: 25 / 2,
		backgroundColor: Colors.light.primary,
		justifyContent: "center",
		alignItems: "center"
	},
	itemTitle: { fontSize: 14, fontFamily: "Lexend-Regular" },
	subItemsContainer: {
		overflow: "hidden",
		marginLeft: 13.5,
		marginVertical: 10,
		paddingLeft: 18,
		borderLeftWidth: 1,
		borderLeftColor: Colors.light.secondary,
		position: "relative",
		width: "84%",
		gap: 10
	},
	subItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#0000001A",
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
