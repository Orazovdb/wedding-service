// file: components/SubscribersSubscribeSlider.tsx

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
const ITEM_WIDTH = SCREEN_WIDTH / 5.4;

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

	return (
		<View style={styles.wrapper}>
			<TouchableOpacity
				style={styles.navButtonLeft}
				onPress={() => scrollToIndex(currentIndex - 1)}
			>
				<Text style={styles.navButtonText}>{"<"}</Text>
			</TouchableOpacity>
			<View style={styles.container}>
				<FlatList
					ref={flatListRef}
					data={SubscribersData}
					keyExtractor={item => item.id}
					horizontal={true}
					scrollEnabled={false}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => (
						<SubscriberItem
							item={item}
							isActive={props.subscribe_id === item.id}
							onSelectSubCategory={props.onSelectSubCategory}
						/>
					)}
					getItemLayout={(data, index) => ({
						length: ITEM_WIDTH,
						offset: ITEM_WIDTH * index,
						index
					})}
					initialNumToRender={10}
				/>
			</View>
			<TouchableOpacity
				style={styles.navButtonRight}
				onPress={() => scrollToIndex(currentIndex + 1)}
			>
				<Text style={styles.navButtonText}>{">"}</Text>
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
		position: "relative",
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
		left: 0,
		zIndex: 10,
		width: 40,
		height: 40,
		backgroundColor: "#ddd",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	navButtonRight: {
		position: "absolute",
		right: 0,
		zIndex: 10,
		width: 40,
		height: 40,
		backgroundColor: "#ddd",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	navButtonText: {
		fontSize: 20,
		fontWeight: "bold"
	},
	categoryItem: {
		flexDirection: "column",
		marginRight: 8,
		position: "relative",
		paddingBottom: 50,
		alignItems: "center",
		justifyContent: "flex-start"
	},
	categoryItemActive: {
		marginLeft: 30,
		marginRight: 20
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
	}
});
