import { Followers, FollowersData } from "@/shared/api/types";
import IconArrowLeft from "@/shared/icons/arrow-left-big.svg";
import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = SCREEN_WIDTH / 5.6;

type Props = {
	subscribe_id: string;
	onSelectSubCategory: (id: string) => void;
	dataSubscribers: FollowersData | undefined;
	index: number;
	setIndex: (index: number) => void;
};

export const SubscribersSubscribeSlider = (props: Props) => {
	const flatListRef = useRef<FlatList>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (!props.dataSubscribers?.data?.length) return;

		const subscribeId =
			Array.isArray(props.subscribe_id) && props.subscribe_id.length > 0
				? props.subscribe_id[0]
				: props.subscribe_id;

		const index = props.dataSubscribers.data.findIndex(
			item => String(item.id) === String(subscribeId)
		);
		if (index === -1) {
			setCurrentIndex(0);
			props.setIndex(0);
			props.onSelectSubCategory(String(props.dataSubscribers.data[0].id));
			return;
		}

		if (index !== -1 && flatListRef.current) {
			flatListRef.current.scrollToIndex({
				index,
				animated: true,
				viewPosition: 0
			});
			setCurrentIndex(index);
			props.setIndex(index);
			props.onSelectSubCategory(String(props.dataSubscribers.data[index].id));
		}
	}, [props.subscribe_id, props.dataSubscribers]);

	const scrollToIndex = (index: number) => {
		if (
			props.dataSubscribers?.data &&
			index >= 0 &&
			index < props.dataSubscribers.data.length
		) {
			flatListRef.current?.scrollToIndex({
				index,
				animated: true,
				viewPosition: 0
			});
			setCurrentIndex(index);
			props.onSelectSubCategory(String(props.dataSubscribers.data[index].id));
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
					data={props.dataSubscribers?.data}
					keyExtractor={(item, index) => `${item.id}_${index}`}
					horizontal
					pagingEnabled={false}
					scrollEnabled={true}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item, index }) => (
						<SubscriberItem
							item={item}
							isActive={index === currentIndex}
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
	item: Followers;
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
				source={{ uri: item.logo }}
				style={[
					styles.image,
					{
						width: animatedSize,
						height: animatedSize,
						borderRadius: Animated.divide(animatedSize, 2)
					}
				]}
			/>
		</TouchableOpacity>
	);
};

export const styles = StyleSheet.create({
	wrapper: {
		marginTop: 30,
		height: 140,
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
		width: 300,
		alignItems: "center",
		justifyContent: "center"
	},
	categoryItemActive: {
		marginLeft: 40,
		marginRight: 30,
		marginBottom: 0
	},
	image: {
		marginBottom: 2
	},
	titleBlock: {},
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
