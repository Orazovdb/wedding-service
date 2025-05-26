import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { BASE_URL } from "@/shared/api/interceptors";
import { getAccessToken } from "@/shared/api/services/auth-token.service";
import { HumanServicesByIdData } from "@/shared/api/types";
import { Video } from "expo-av";
import { BlurView } from "expo-blur";
import { useVideoPlayer } from "expo-video";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	ActivityIndicator,
	Animated,
	Dimensions,
	FlatList,
	Image,
	Keyboard,
	Modal,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";

const { width, height } = Dimensions.get("window");

export const HomeDetailBanner = ({
	data
}: {
	data: HumanServicesByIdData | undefined;
}) => {
	const { t } = useTranslation();
	const [isBuffering, setIsBuffering] = useState(true);
	const [isVideoSlide, setIsVideoSlide] = useState(true);
	const [isImageViewerVisible, setImageViewerVisible] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [authToken, setAuthToken] = useState<string | null>(null);

	useEffect(() => {
		getAccessToken().then(setAuthToken);
	}, []);

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

	const player = useVideoPlayer(
		{ uri: data?.service?.videos[0]?.filename },
		player => {
			player.muted = false;
			player.loop = false;
			if (!isBuffering) {
				player.play();
			}
		}
	);

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

	useEffect(() => {
		if (!data?.service.videos.length) {
			setIsVideoSlide(false);
		}
		console.log(
			`${BASE_URL}/videos/stream/${data?.service?.videos[0]?.filename}`
		);
	}, []);

	const handleChangeVideo = (value: boolean) => {
		setIsVideoSlide(value);
		setCurrentIndex(0);
	};

	useEffect(() => {
		if (!data?.service?.videos?.length) return;

		const currentVideo = data?.service?.videos[currentIndex];
		if (!currentVideo?.id) return;
	}, [data, currentIndex]);

	const videoRef = useRef<Video>(null);

	return (
		<View style={styles.sliderContainer}>
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
							{t("videos")} ({data?.service.videos.length})
						</Text>
					</TouchableOpacity>
					{data && data?.service.images?.length > 0 && (
						<TouchableOpacity
							onPress={() => handleChangeVideo(false)}
							style={[styles.tab, !isVideoSlide && styles.tabActive]}
						>
							<Text
								style={[styles.tabText, !isVideoSlide && styles.tabActiveText]}
							>
								{t('images')} ({data?.service.images.length})
							</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
			{isVideoSlide ? (
				<>
					{isBuffering && <ActivityIndicator size="large" color="#0000ff" />}
					<FlatList
						data={data?.service?.videos}
						keyExtractor={item => item.id.toString()}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						onScroll={handleScroll}
						onMomentumScrollEnd={handleMomentumScrollEnd}
						style={styles.flatList}
						renderItem={({ item }) => (
							<View key={item.id} style={styles.slide}>
								<TouchableOpacity
									activeOpacity={0.8}
									onPress={async () => {
										try {
											await videoRef.current?.presentFullscreenPlayer();

											setTimeout(() => {
												videoRef.current
													?.playAsync()
													.catch(err =>
														console.error("Video play failed:", err)
													);
											}, 500);
										} catch (e) {
											console.error("Fullscreen play error:", e);
										}
									}}
									style={styles.image}
								>
									<Video
										ref={videoRef}
										source={{
											uri: `${BASE_URL}/videos/stream/${item?.filename}`,
											headers: {
												Authorization: `${authToken}`,
												Range: "bytes=400-100000"
											}
										}}
										style={styles.image}
										useNativeControls
										shouldPlay={false}
										isLooping={false}
									/>

									<View style={styles.overlayPlayButton}>
										<Text style={styles.playIcon}>▶</Text>
									</View>
								</TouchableOpacity>
							</View>
						)}
					/>
					{data && data?.service?.videos?.length > 1 && (
						<>
							<View style={styles.paginationContainer}>
								<View style={styles.pagination}>
									{data?.service?.videos.map((_, i) => (
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
										{currentIndex + 1}/{data?.service?.videos.length}
									</Text>
								</View>
							</View>
						</>
					)}
				</>
			) : (
				<>
					{isBuffering && <ActivityIndicator size="large" color="#000" />}
					<FlatList
						data={data?.service?.images}
						keyExtractor={item => item.id.toString()}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						onScroll={handleScroll}
						onMomentumScrollEnd={handleMomentumScrollEnd}
						style={styles.flatList}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								onPress={() => {
									setSelectedImageIndex(index);
									setImageViewerVisible(true);
								}}
							>
								<Image source={{ uri: item.url }} style={styles.image} />
							</TouchableOpacity>
						)}
					/>
					{data && data?.service?.images?.length > 1 && (
						<>
							<View style={styles.paginationContainer}>
								<View style={styles.pagination}>
									{data?.service?.images.map((_, i) => (
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
										{currentIndex + 1}/{data?.service?.images.length}
									</Text>
								</View>
							</View>
						</>
					)}
				</>
			)}
			{isImageViewerVisible && (
				<Modal
					visible
					transparent
					onRequestClose={() => setImageViewerVisible(false)}
				>
					<FlatList
						data={data?.service?.images}
						keyExtractor={item => item?.id?.toString()}
						horizontal
						pagingEnabled
						initialScrollIndex={selectedImageIndex}
						style={styles.fullscreenGallery}
						renderItem={({ item }) => (
							<View style={styles.fullscreenImageWrapper}>
								<Image
									source={{ uri: item?.url }}
									style={styles.fullscreenImage}
								/>
							</View>
						)}
					/>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={() => setImageViewerVisible(false)}
					>
						<Text style={styles.closeText}>✕</Text>
					</TouchableOpacity>
				</Modal>
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

	overlayPlayButton: {
		position: "absolute",
		top: "45%",
		left: "45%",
		backgroundColor: "rgba(0,0,0,0.6)",
		borderRadius: 30,
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center"
	},
	playIcon: {
		fontSize: 28,
		color: "#fff"
	},

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
	},
	fullscreenGallery: {
		backgroundColor: "black"
	},
	fullscreenImageWrapper: {
		width,
		height,
		justifyContent: "center",
		alignItems: "center"
	},
	fullscreenImage: {
		width,
		height,
		resizeMode: "contain"
	},
	closeButton: {
		position: "absolute",
		top: 40,
		right: 20,
		zIndex: 10
	},
	closeText: {
		fontSize: 28,
		color: "#fff"
	}
});
