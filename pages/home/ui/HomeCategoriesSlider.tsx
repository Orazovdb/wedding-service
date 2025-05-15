import React, { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";

import { Colors } from "@/constants/Colors";
import { categoriesService } from "@/shared/api/services/categories.service";
import type { CategoriesWithChildren } from "@/shared/api/types";
import ArrowLeft from "@/shared/icons/arrow-left.svg";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export const HomeCategoriesSlider = () => {
	const router = useRouter();
	const previewFlatListRef = useRef<FlatList<any>>(null);

	const [currentIndex, setCurrentIndex] = useState(0);

	const scrollToIndex = (index: any) => {
		previewFlatListRef.current?.scrollToIndex({ index, animated: true });
	};

	const [data, setData] = useState<CategoriesWithChildren[]>();

	useEffect(() => {
		const fetchData = async () => {
			const result = await categoriesService.getCategories({ parent: 1 });
			setData(result);
		};

		fetchData();
	}, []);

	return (
		<View style={styles.previewSliderContainer}>
			<TouchableOpacity
				style={styles.arrowLeft}
				onPress={() => scrollToIndex(Math.max(currentIndex - 1, 0))}
			>
				<ArrowLeft />
			</TouchableOpacity>

			<FlatList
				ref={previewFlatListRef}
				data={data}
				keyExtractor={(item: CategoriesWithChildren) => String(item.id)}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ alignItems: "center" }}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.previewSlide}
						onPress={() =>
							router.push({
								pathname: "/categories/[categories_detail]/[id]",
								params: {
									categories_detail: item.id,
									id: "all"
								}
							})
						}
					>
						<View style={styles.previewImageWrapper}>
							<Image source={{ uri: item.icon }} style={styles.previewImage} />
						</View>
						<Text
							style={{
								fontSize: 10,
								color: Colors.light.secondary,
								fontWeight: "400"
							}}
						>
							{item.name}
						</Text>
					</TouchableOpacity>
				)}
			/>

			<TouchableOpacity
				style={styles.arrowRight}
				onPress={() =>
					scrollToIndex(Math.min(currentIndex + 1, data?.length || 0 - 1))
				}
			>
				<ArrowLeft />
			</TouchableOpacity>
		</View>
	);
};

export const styles = StyleSheet.create({
	previewSliderContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 18,
		marginBottom: 22,
		position: "relative",
		paddingHorizontal: 20
	},
	previewSlide: {
		borderRadius: width / 12.2 / 2,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 5
	},
	previewImageWrapper: {
		borderRadius: width / 11.2 / 2,
		backgroundColor: Colors.light.primary,
		width: width / 11.2,
		height: width / 11.2,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 4
	},
	previewImage: {
		borderRadius: width / 14.2 / 2,
		width: width / 14.2,
		height: width / 14.2
	},
	arrow: { fontSize: 24, fontWeight: "bold", paddingHorizontal: 10 },
	arrowLeft: {
		position: "absolute",
		left: 0,
		zIndex: 1
	},
	arrowRight: {
		position: "absolute",
		right: 0,
		zIndex: 1,
		transform: [{ rotate: "180deg" }]
	}
});
