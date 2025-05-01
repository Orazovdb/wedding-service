import IconArrowLeft from "@/shared/icons/arrow-left-big.svg";
import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { SubscribersData } from "../data";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = SCREEN_WIDTH / 6.3;

type Props = {
	subscribe_id: string | string[];
	onSelectSubCategory: (id: string) => void;
};

export const SubscribersSubscribeSlider = (props: Props) => {
	const flatListRef = useRef<FlatList>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const index = SubscribersData.findIndex(
			item => item.id === props.subscribe_id
		);
		if (index !== -1 && flatListRef.current) {
			flatListRef.current.scrollToIndex({
				index,
				animated: true,
				viewPosition: 0
			});
			setCurrentIndex(index);
		}
	}, [props.subscribe_id]);

	const scrollToIndex = (index: number) => {
		if (index >= 0 && index < SubscribersData.length) {
			flatListRef.current?.scrollToIndex({
				index,
				animated: true,
				viewPosition: 0
			});
			props.onSelectSubCategory(SubscribersData[index].id);
		}
	};

	useEffect(() => {
		props.onSelectSubCategory(SubscribersData[currentIndex]?.id);
	}, [currentIndex]);

	return (
		<View style={styles.wrapper}>
			<TouchableOpacity
				style={styles.navButtonLeft}
				onPress={() => scrollToIndex(currentIndex - 1)}
			>
				<IconArrowLeft />
			</TouchableOpacity>
			<View style={styles.container}>
				<FlatList
					ref={flatListRef}
					data={SubscribersData}
					keyExtractor={item => item.id}
					horizontal
					pagingEnabled
					scrollEnabled
					showsHorizontalScrollIndicator={false}
					onViewableItemsChanged={({ viewableItems }) => {
						if (viewableItems.length > 0) {
							const index = viewableItems[0].index ?? 0;
							setCurrentIndex(index);
						}
					}}
					viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
					renderItem={({ item }) => (
						<SubscriberItem
							item={item}
							isActive={props.subscribe_id === item.id}
							onSelectSubCategory={props.onSelectSubCategory}
						/>
					)}
					getItemLayout={(_, index) => ({
						length: ITEM_WIDTH,
						offset: ITEM_WIDTH * index,
						index
					})}
					initialNumToRender={3}
					snapToInterval={ITEM_WIDTH}
					decelerationRate="fast"
					contentContainerStyle={styles.flatListContent}
				/>
			</View>
			<TouchableOpacity
				style={styles.navButtonRight}
				onPress={() => scrollToIndex(currentIndex + 1)}
			>
				<IconArrowLeft />
			</TouchableOpacity>
		</View>
	);
};

type ItemProps = {
	item: any;
	isActive: boolean;
	onSelectSubCategory: (id: string) => void;
};

const SubscriberItem = ({ item, isActive, onSelectSubCategory }: ItemProps) => {
	const animatedSize = useRef(new Animated.Value(isActive ? 120 : 60)).current;

	useEffect(() => {
		Animated.timing(animatedSize, {
			toValue: isActive ? 120 : 60,
			duration: 300,
			useNativeDriver: false
		}).start();
	}, [isActive]);

	return (
		<TouchableOpacity
			style={[
				styles.categoryItem,
				isActive ? styles.categoryItemActive : null,
				{ width: ITEM_WIDTH }
			]}
			onPress={() => onSelectSubCategory(item.id)}
		>
			<Animated.Image
				source={item.image}
				style={[
					styles.image,
					{
						width: animatedSize,
						height: animatedSize,
						borderRadius: Animated.divide(animatedSize, 2)
					}
				]}
			/>
			<View
				style={[styles.titleBlock, isActive ? styles.titleBlockActive : null]}
			>
				<Text
					style={[
						styles.categoryItemText,
						isActive ? styles.categoryItemTextActive : null
					]}
				>
					{item.name}
				</Text>
				<Text
					style={[
						styles.categoryItemText,
						isActive ? styles.categoryItemTextActive : null
					]}
				>
					{item.surname}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export const styles = StyleSheet.create({
	wrapper: {
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 16
	},
	container: {
		flexDirection: "row",
		alignItems: "center"
	},
	navButtonLeft: {
		position: "absolute",
		top: Dimensions.get("window").height / 2 - 80,
		left: 0,
		zIndex: 10,
		width: 30,
		height: 28,
		backgroundColor: "#000000",
		borderRadius: 4,
		justifyContent: "center",
		alignItems: "center"
	},
	navButtonRight: {
		position: "absolute",
		top: Dimensions.get("window").height / 2 - 80,
		right: 0,
		zIndex: 10,
		width: 30,
		height: 28,
		backgroundColor: "#000000",
		borderRadius: 4,
		justifyContent: "center",
		alignItems: "center",
		transform: [{ rotate: "-180deg" }]
	},
	navButtonText: {
		fontSize: 20,
		fontWeight: "bold"
	},
	categoryItem: {
		width: SCREEN_WIDTH,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 70
	},
	categoryItemActive: {
		marginLeft: 40,
		marginRight: 30
	},
	image: {
		marginBottom: 2
	},
	titleBlock: {},
	titleBlockActive: {
		position: "absolute",
		top: "100%",
		marginTop: 6
	},
	categoryItemText: {
		color: "#000",
		fontFamily: "Lexend-Light",
		fontSize: 13,
		marginHorizontal: "auto",
		textAlign: "center"
	},
	categoryItemTextActive: {
		fontFamily: "Lexend-Medium",
		fontSize: 16
	},
	flatListContent: {
		justifyContent: "center",
		alignItems: "center"
	}
});
