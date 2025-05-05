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
	View,
	
} from "react-native";
import { FakeSlides } from "../data";

const { width, height } = Dimensions.get("window");

export const SubscribersInfoBanner = () => {
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
		<View style={styles.flatList}>
			<FlatList
				data={FakeSlides}
				keyExtractor={item => item.id}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				onMomentumScrollEnd={handleMomentumScrollEnd}
				
				renderItem={({ item }) => (
					<View style={styles.slide}>
						<Image source={item.image} style={styles.image} />
					</View>
				)}
			/>
			<View style={styles.paginationContainer}>
				<View style={styles.pagination}>
					{FakeSlides.map((_, i) => (
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
		</View>
	);
};

export const styles = StyleSheet.create({
	flatList: {
		paddingBottom: 40,
		position: 'relative'
	},
	slide: { width: width * 0.85, },
	image: {
		width: width * 0.9,
		height: height * 0.23,
		resizeMode: "cover"
	},
	paginationContainer: {
		position: "absolute",
		bottom: 20,
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
