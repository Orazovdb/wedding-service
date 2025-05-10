import React, { useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { FakeSlides } from "../data";

import { Colors } from "@/constants/Colors";
import ArrowLeft from "@/shared/icons/arrow-left.svg";
import SliderCategoryIcon from "@/shared/icons/slider-category-icon.svg";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export const HomeCategoriesSlider = () => {
	const router = useRouter();
	const previewFlatListRef = useRef<FlatList<any>>(null);

	const [currentIndex, setCurrentIndex] = useState(0);

	const scrollToIndex = (index: any) => {
		previewFlatListRef.current?.scrollToIndex({ index, animated: true });
	};

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
				data={FakeSlides}
				keyExtractor={item => item.id}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ alignItems: "center" }}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.previewSlide}
						onPress={() => router.push("/")}
					>
						<View style={styles.previewImage}>
							<SliderCategoryIcon />
						</View>
						<Text
							style={{
								fontSize: 10,
								color: Colors.light.secondary,
								fontWeight: "400"
							}}
						>
							Fatalar
						</Text>
					</TouchableOpacity>
				)}
			/>

			<TouchableOpacity
				style={styles.arrowRight}
				onPress={() =>
					scrollToIndex(Math.min(currentIndex + 1, FakeSlides.length - 1))
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
	previewImage: {
		borderRadius: width / 12.2 / 2,
		backgroundColor: Colors.light.primary,
		width: width / 11.2,
		height: width / 11.2,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 4
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
