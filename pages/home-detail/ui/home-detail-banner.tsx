import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { BASE_URL } from "@/shared/api/interceptors";
import { getAccessToken } from "@/shared/api/services/auth-token.service";
import { HumanServicesByIdData } from "@/shared/api/types";
import {
	ResizeMode as ResizeModeAv,
	Video,
	VideoFullscreenUpdate
} from "expo-av";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Animated,
	Dimensions,
	FlatList,
	Image,
	Keyboard,
	Modal,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
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
	const [authToken, setAuthToken] = useState<string | null>(null);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [isImageViewerVisible, setImageViewerVisible] = useState(false);
	const colorScheme: "light" | "dark" = useColorScheme() ?? "light";
	const scrollX = useRef(new Animated.Value(0)).current;
	const [currentIndex, setCurrentIndex] = useState(0);
	const videoRef = useRef<Video>(null);
	const [isVideoSlide, setIsVideoSlide] = useState(true);

	useEffect(() => {
		getAccessToken().then(setAuthToken);
	}, []);

	const videoRefs = useRef<Record<number, Video>>({});

	const handleMomentumScrollEnd = (
		event: NativeSyntheticEvent<NativeScrollEvent>
	) => {
		const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);

		if (currentIndex === newIndex) {
			const previousRef = videoRefs.current[currentIndex];
			previousRef?.setPositionAsync(0);
		}

		setCurrentIndex(newIndex);
	};

	const handleChangeVideo = (value: boolean) => {
		setIsVideoSlide(value);
		setCurrentIndex(0);
	};

	const handleScroll = Animated.event(
		[{ nativeEvent: { contentOffset: { x: scrollX } } }],
		{ useNativeDriver: false, listener: () => Keyboard.dismiss() }
	);

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
								{t("images")} ({data?.service.images.length})
							</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
			{isVideoSlide ? (
				<>
					<FlatList
						data={data?.service?.videos}
						keyExtractor={item => item.id.toString()}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						onMomentumScrollEnd={handleMomentumScrollEnd}
						style={styles.flatList}
						renderItem={({ item, index }) => (
							<View style={styles.videoWrapper}>
								<Video
									ref={ref => {
										if (ref) videoRefs.current[index] = ref;
									}}
									source={{
										uri: `${BASE_URL}/videos/stream/${item.filename}`,
										headers: { Authorization: `Bearer ${authToken}` }
									}}
									style={styles.video}
									resizeMode={ResizeModeAv.CONTAIN}
									useNativeControls
									isLooping={false}
									shouldPlay={false}
									onFullscreenUpdate={event => {
										if (
											event.fullscreenUpdate ===
											VideoFullscreenUpdate.PLAYER_DID_PRESENT
										) {
											console.log("Fullscreen entered");
										}
										if (
											event.fullscreenUpdate ===
											VideoFullscreenUpdate.PLAYER_DID_DISMISS
										) {
											console.log("Fullscreen exited");
										}
									}}
								/>
								{Platform.OS === "ios" ? (
									<TouchableOpacity
										onPress={async () => {
											try {
												if (Platform.OS === "ios") {
													await videoRef.current?.presentFullscreenPlayer();
												} else {
													await videoRef.current?.playAsync();
												}
											} catch (e) {
												console.error("Video play error:", e);
											}
										}}
										style={styles.overlayPlayButton}
									>
										<Text style={styles.playIcon}>▶</Text>
									</TouchableOpacity>
								) : null}
							</View>
						)}
					/>

					{data && data?.service?.videos?.length > 1 && (
						<View style={styles.paginationContainer}>
							<View style={styles.pagination}>
								{data.service.videos.map((_, i) => (
									<View
										key={i}
										style={[
											styles.dot,
											{
												backgroundColor:
													i === currentIndex
														? Colors[colorScheme].primary
														: Colors[colorScheme].white
											}
										]}
									/>
								))}
							</View>
						</View>
					)}
				</>
			) : (
				<>
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
						keyExtractor={item => item.id.toString()}
						horizontal
						pagingEnabled
						initialScrollIndex={selectedImageIndex}
						style={styles.fullscreenGallery}
						renderItem={({ item }) => (
							<View style={styles.fullscreenImageWrapper}>
								<Image
									source={{ uri: item.url }}
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
	sliderContainer: { flex: 1, width },
	tabsWrapper: {
		position: "absolute",
		top: 14,
		alignSelf: "center",
		zIndex: 10
	},
	tabs: {
		flexDirection: "row",
		gap: 4,
		borderRadius: 4,
		overflow: "hidden",
		paddingVertical: 4,
		paddingHorizontal: 2,
		position: "relative"
	},
	tabsBackground: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "#00000033",
		borderRadius: 4
	},
	tab: { borderRadius: 4, paddingHorizontal: 8 },
	tabText: { color: "#FFFFFF", fontSize: 12, fontFamily: "Lexend-Light" },
	tabActive: { backgroundColor: Colors.light.primary },
	tabActiveText: { color: Colors.light.secondary },
	flatList: { flex: 1 },
	videoWrapper: {
		width: width,
		height: height * 0.28,
		backgroundColor: "black"
	},
	video: { width: "100%", height: "100%", paddingBottom: 40 },
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
	playIcon: { fontSize: 28, color: "#fff" },
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
	fullscreenGallery: { backgroundColor: "black" },
	fullscreenImageWrapper: {
		width,
		height,
		justifyContent: "center",
		alignItems: "center"
	},
	fullscreenImage: { width, height, resizeMode: "contain" },
	closeButton: { position: "absolute", top: 40, right: 20, zIndex: 10 },
	closeText: { fontSize: 28, color: "#fff" },
	image: {
		width: width * 1,
		height: height * 0.28,
		resizeMode: "cover"
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
	}
});
