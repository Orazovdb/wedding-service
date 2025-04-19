import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import ArrowLeftBigIcon from "@/shared/icons/arrow-left-big.svg";
// import { BlurView } from "expo-blur";
import { BlurView } from "expo-blur";
import { useVideoPlayer } from "expo-video";
import React, { useEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
	Animated,
	Dimensions,
	FlatList,
	Image,
	Keyboard,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { FakeSlides } from "../data";

const { width, height } = Dimensions.get("window");

export const HomeDetailBanner = () => {
	const [isBuffering, setIsBuffering] = useState(true);
	const [isVideoSlide, setIsVideoSlide] = useState(true);

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

	const videoUrl =
		"https://ybady.com.tm:8090/api/v1/videos/stream/RZDKzGghTdHfGZoXM8pFG7ztcYICAw5dX595naWC.mp4";

	const player = useVideoPlayer({ uri: videoUrl }, player => {
		player.muted = false;
		player.loop = false;
		if (!isBuffering) {
			player.play();
		}
	});

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsBuffering(false);
		}, 500);

		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		if (!isBuffering) {
			player.play();
		} else {
			player.pause();
		}
	}, [isBuffering, player]);

	const handleChangeVideo = (value: boolean) => {
		setIsVideoSlide(value);
	};

	return (
		<View style={styles.sliderContainer}>
			<View style={styles.backIcon}>
				<ArrowLeftBigIcon />
			</View>
			<View style={styles.tabsWrapper}>
				<View style={styles.tabs}>
					<BlurView
						intensity={50}
						tint="dark"
						style={StyleSheet.absoluteFill}
					/>
					<View style={styles.tabsBackground} />

					<TouchableOpacity
						onPress={() => handleChangeVideo(true)}
						style={[styles.tab, isVideoSlide && styles.tabActive]}
					>
						<Text
							style={[styles.tabText, isVideoSlide && styles.tabActiveText]}
						>
							Videolar ({FakeSlides.length.toString()})
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleChangeVideo(false)}
						style={[styles.tab, !isVideoSlide && styles.tabActive]}
					>
						<Text
							style={[styles.tabText, !isVideoSlide && styles.tabActiveText]}
						>
							Suratlar ({FakeSlides.length.toString()})
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			{isVideoSlide ? (
				<>
					{isBuffering && <ActivityIndicator size="large" color="#0000ff" />}
					<FlatList
						data={FakeSlides}
						keyExtractor={item => item.id}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						onScroll={handleScroll}
						onMomentumScrollEnd={handleMomentumScrollEnd}
						style={styles.flatList}
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
					<View style={styles.paginationFractionWrapper}>
						<View style={styles.paginationFraction}>
							<Text style={styles.paginationFractionText}>
								{currentIndex + 1}/{FakeSlides.length}
							</Text>
						</View>
					</View>
				</>
			) : (
				<>
					{isBuffering && <ActivityIndicator size="large" color="#0000ff" />}
					<FlatList
						data={FakeSlides}
						keyExtractor={item => item.id}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						onScroll={handleScroll}
						onMomentumScrollEnd={handleMomentumScrollEnd}
						style={styles.flatList}
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
					<View style={styles.paginationFractionWrapper}>
						<View style={styles.paginationFraction}>
							<Text style={styles.paginationFractionText}>
								{currentIndex + 1}/{FakeSlides.length}
							</Text>
						</View>
					</View>
				</>
			)}
		</View>
	);
};

export const styles = StyleSheet.create({
	sliderContainer: {
		position: "relative",
		flexGrow: 1,
		width: width
	},

	backIcon: {
		position: "absolute",
		top: 12,
		left: 18,
		zIndex: 10,
		paddingVertical: 2,
		paddingHorizontal: 6,
		backgroundColor: "#00000099",
		borderRadius: 4
	},

	tabsWrapper: {
		position: "absolute",
		top: 14,
		alignSelf: "center",
		zIndex: 10
	},

	tabs: {
		paddingVertical: 4,
		paddingHorizontal: 2,
		borderRadius: 4,
		flexDirection: "row",
		gap: 4,
		overflow: "hidden",
		position: "relative"
	},

	tabsBackground: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "#00000033",
		borderRadius: 4
	},

	tab: {
		borderRadius: 4,
		paddingHorizontal: 8
	},

	tabActive: { backgroundColor: Colors.light.primary },
	tabActiveText: {
		color: Colors.light.secondary
	},

	tabText: {
		color: "#FFFFFF",
		fontSize: 12,
		fontFamily: "Lexend-Light",
		backgroundColor: "transparent"
	},

	flatList: { flex: 1 },
	slide: { width: width },
	image: {
		width: width * 1,
		height: height * 0.28,
		resizeMode: "cover"
	},
	paginationContainer: {
		position: "absolute",
		bottom: 14,
		alignSelf: "center",
		zIndex: 10
	},
	pagination: {
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "#00000099",
		paddingVertical: 2,
		paddingHorizontal: 10,
		borderRadius: 3,
		minWidth: 100
	},
	dot: { width: 7, height: 7, borderRadius: 7 / 2, marginHorizontal: 2 },

	paginationFractionWrapper: {
		position: "absolute",
		right: 30,
		bottom: 12,
		alignSelf: "center",
		zIndex: 10
	},
	paginationFraction: {
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "#00000099",
		paddingVertical: 2,
		paddingHorizontal: 10,
		borderRadius: 4,
		minWidth: 54
	},
	paginationFractionText: {
		fontFamily: "Lexend-Regular",
		fontSize: 12,
		color: Colors.dark.white
	}
});
