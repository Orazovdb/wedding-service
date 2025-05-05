import IconArrowLeft from "@/shared/icons/arrow-left-big.svg";
import IconSubscribed from "@/shared/icons/subscribed-icon.svg";
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
const ITEM_WIDTH = SCREEN_WIDTH / 5.6;

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
			setCurrentIndex(index);
			props.onSelectSubCategory(SubscribersData[index].id);
		}
	};

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
					pagingEnabled={false}
					scrollEnabled={true}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item, index }) => (
						<SubscriberItem
							item={item}
							isActive={SubscribersData[currentIndex].id === item.id}
							onPress={() => scrollToIndex(index)}
						/>
					)}
					getItemLayout={(_, index) => ({
						length: ITEM_WIDTH,
						offset: ITEM_WIDTH * index,
						index
					})}
					initialNumToRender={5}
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
	onPress: () => void;
};

const SubscriberItem = ({ item, isActive, onPress }: ItemProps) => {
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
			onPress={onPress}
			activeOpacity={0.8}
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
				{item.isPremium && isActive && (
					<View
						style={[
							styles.categoryItemIcon,
							isActive ? styles.categoryItemIconActive : null
						]}
					>
						<IconSubscribed />
					</View>
				)}
				{isActive ? (
					<Text
						style={[styles.categoryItemText, styles.categoryItemTextActive]}
					>
						{item.surname}
					</Text>
				) : (
					<Text style={styles.categoryItemText}>{item.surname}</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

export const styles = StyleSheet.create({
	wrapper: {
		marginTop: 16,
		height: 200,
		zIndex: 10
	},
	container: {
		flexDirection: "row",
		alignItems: "center"
	},
	navButtonLeft: {
		position: "absolute",
		top: Dimensions.get("window").height / 2 - 60,
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
		top: Dimensions.get("window").height / 2 - 60,
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
		marginBottom: 70
	},
	categoryItemActive: {
		marginLeft: 40,
		marginRight: 30,
		paddingBottom: 70,
		marginBottom: 0
	},
	image: {
		marginBottom: 2
	},
	titleBlock: {
	},
	titleBlockActive: {
		position: "absolute",
		top: "100%",
		width: "140%",
		backgroundColor: "#fff",
		paddingTop: 6
	},
	categoryItemText: {
		color: "#000",
		fontFamily: "Lexend-Light",
		fontSize: 13,
		marginHorizontal: "auto",
		textAlign: "center",
		flexDirection: "row",
		alignItems: "center",
		position: "relative"
	},
	categoryItemIcon: {
		position: "absolute",
		right: -6,
		top: 0
	},
	categoryItemIconActive: {
		position: "absolute",
		right: 4,
		top: 8
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
