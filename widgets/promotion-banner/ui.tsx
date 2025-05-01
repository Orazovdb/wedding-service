// File: components/SubscribersSubscribeSlider.tsx

import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	Image,
	FlatList as RNFlatList,
	TouchableOpacity,
	View
} from "react-native";

const AnimatedFlatList = Animated.createAnimatedComponent(RNFlatList);

export const SubscribersSubscribeSlider = () => {
	const flatListRef = useRef<RNFlatList>(null);
	const screenWidth = Dimensions.get("window").width;
	const [activeIndex, setActiveIndex] = useState(0);
	const [items, setItems] = useState<{ id: number; image: any }[]>([]);
	const scrollX = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const interval = setInterval(() => {
			if (items.length === 0) return;
			const nextIndex = (activeIndex + 1) % items.length;
			flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
			setActiveIndex(nextIndex);
		}, 3000);
		return () => clearInterval(interval);
	}, [activeIndex, items]);

	const slideClicked = (item: { id: number; image: any }) => {
		// Placeholder for slide click action
	};

	const renderItem = ({
		item,
		index
	}: {
		item: { id: number; image: any };
		index: number;
	}) => (
		<TouchableOpacity key={index} onPress={() => slideClicked(item)}>
			<View style={{ width: screenWidth, height: 200, padding: 15 }}>
				<Image
					source={item.image}
					style={{ height: "100%", width: "100%", borderRadius: 20 }}
				/>
			</View>
		</TouchableOpacity>
	);

	const renderDotIndicators = () =>
		items.map((_, index) => (
			<View
				key={`dot-${index}`}
				style={{
					height: 10,
					width: 10,
					borderRadius: 5,
					marginHorizontal: 6,
					backgroundColor: activeIndex === index ? "white" : "gray"
				}}
			/>
		));

	useEffect(() => {
		const DATA = [
			{ id: 0, image: require("@/shared/images/login/slider-3.png") },
			{ id: 1, image: require("@/shared/images/login/slider-3.png") },
			{ id: 2, image: require("@/shared/images/login/slider-3.png") },
			{ id: 3, image: require("@/shared/images/login/slider-3.png") }
		];
		setItems(DATA);
	}, []);

	return (
		<View style={{ width: "100%" }}>
			<AnimatedFlatList
				data={items}
				ref={flatListRef}
				renderItem={({ item, index }: any) => renderItem({ item, index })}
				keyExtractor={(item: any) => item.id.toString()}
				horizontal
				pagingEnabled
				scrollEnabled={false}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: true, listener: () => {} }
				)}
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator={false}
			/>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					position: "absolute",
					left: "30%",
					top: "80%"
				}}
			>
				{renderDotIndicators()}
			</View>
		</View>
	);
};
