import { Colors } from "@/constants/Colors";
import React, { useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	FlatList,
	Image,
	Keyboard,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet,
	useColorScheme,
	View
} from "react-native";
import { Home } from "../types";

const { width, height } = Dimensions.get("window");

interface props extends Home {}

export const HomeMainBanner = ({ data }: { data: Home | undefined }) => {
	const colorScheme: "light" | "dark" = useColorScheme() ?? "light";
	const scrollX = useRef(new Animated.Value(0)).current;
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleScroll = Animated.event(
		[{ nativeEvent: { contentOffset: { x: scrollX } } }],
		{ useNativeDriver: false, listener: () => Keyboard.dismiss() }
	);

	const handleMomentumScrollEnd = (
		event: NativeSyntheticEvent<NativeScrollEvent>
	) => {
		const index = Math.round(event.nativeEvent.contentOffset.x / width);
		setCurrentIndex(index);
	};

	return (
		<>
			<FlatList
				data={data?.homeFeeds}
				keyExtractor={item => String(item.id)}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				onMomentumScrollEnd={handleMomentumScrollEnd}
				style={styles.flatList}
				renderItem={({ item }) => (
					<View style={styles.slide}>
						<Image source={{ uri: item.image }} style={styles.image} />
					</View>
				)}
			/>
			<View style={styles.paginationContainer}>
				<View style={styles.pagination}>
					{data?.homeFeeds.map((_, i) => (
						<View
							key={i}
							style={[
								styles.dot,
								{
									backgroundColor:
										i === currentIndex
											? Colors[colorScheme ?? "light"].primary
											: Colors[colorScheme ?? "light"].white
								}
							]}
						/>
					))}
				</View>
			</View>
		</>
	);
};

export const styles = StyleSheet.create({
	flatList: { flex: 1 },
	slide: { width: width * 1 },
	image: {
		width: width * 1,
		height: height * 0.24,
		resizeMode: "cover"
	},
	paginationContainer: {
		position: "absolute",
		top: height * 0.31,
		alignSelf: "center"
	},
	pagination: {
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "#00000099",
		paddingVertical: 2,
		paddingHorizontal: 10,
		borderRadius: 3
	},
	dot: { width: 7, height: 7, borderRadius: 7 / 2, marginHorizontal: 3 }
});
