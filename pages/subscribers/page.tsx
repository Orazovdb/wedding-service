import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SubscribersFilterModal } from "./ui/subscribers-filter";
import { SubscribersInfo } from "./ui/subscribers-info";
import { SubscribersRecommendCategories } from "./ui/subscribers-recommend-categories";
import { SubscribersSubscribeSlider } from "./ui/subscribers-subscribe-slider";
import { SubscribersUnsubscribe } from "./ui/subscribers-unsubscribe";

export const SubscribersScreen = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedSubscribeId, setSelectedSubscribeId] = useState<string>("1");
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
	const [isUnsubscribeModalVisible, setIsUnsubscribeModalVisible] =
		useState<boolean>(false);

	const handleModalOpen = () => {
		setIsModalVisible(true);
	};

	const handleModalClose = () => {
		setIsModalVisible(false);
	};

	const handleConfirmUnsubscribe = () => {
		setIsUnsubscribeModalVisible(false);
	};

	const handleOpenUnsubscribeModal = () => {
		setIsUnsubscribeModalVisible(true);
		console.log(isUnsubscribeModalVisible);
	};

	return (
		<ScrollView style={styles.safeArea}>
			<View style={styles.page}>
				<View style={styles.header}>
					<View style={styles.subscribersRow}>
						<Text style={styles.subscribersTitle}>20</Text>
						<Text style={styles.subscribersText}>agzalyk</Text>
					</View>
					<SubscribersFilterModal.Button
						isModalVisible={isModalVisible}
						setIsModalVisible={handleModalOpen}
					/>
				</View>
				<SubscribersSubscribeSlider
					subscribe_id={selectedSubscribeId}
					onSelectSubCategory={setSelectedSubscribeId}
				/>
				<SubscribersInfo
					handleOpenModal={handleOpenUnsubscribeModal}
					handleCloseModal={() => setIsUnsubscribeModalVisible(false)}
					isModalVisible={isUnsubscribeModalVisible}
					handleConfirm={handleConfirmUnsubscribe}
				/>
				<View style={styles.subscribersCount}>
					<View style={styles.subscribersCountButton}>
						<Text
							style={[
								styles.subscribersCountText,
								styles.subscribersCountTextActive
							]}
						>
							1
						</Text>
						<Text style={styles.subscribersCountText}> / 212 agzalyklar</Text>
					</View>
				</View>
				<View style={styles.subscribersCountDivider} />
				<SubscribersRecommendCategories
					onSelectCategory={setSelectedCategoryId}
					category_id={selectedCategoryId}
				/>
			</View>

			<SubscribersFilterModal.Modal
				isModalVisible={isModalVisible}
				setIsModalVisible={handleModalClose}
			/>
		
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.light.white
	},
	page: {
		paddingVertical: 20,
		paddingBottom: 100
	},
	header: {
		backgroundColor: "#0000001A",
		borderBottomColor: Colors.light.secondary,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 10,
		marginHorizontal: 16
	},
	subscribersRow: {
		flexDirection: "row",
		alignItems: "flex-end",
		gap: 4
	},
	subscribersTitle: {
		fontFamily: "Lexend-Medium",
		fontSize: 32,
		color: Colors.dark.secondary
	},
	subscribersText: {
		fontFamily: "Lexend-Medium",
		fontSize: 24,
		color: Colors.dark.secondary
	},

	subscribersCount: {
		marginTop: 20,
		marginBottom: 16,
		marginHorizontal: "auto",
		width: "50%"
	},
	subscribersCountButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#C0FFB9",
		borderRadius: 6,
		height: 35,
		width: "100%"
	},
	subscribersCountTextActive: {
		color: "#000000"
	},
	subscribersCountText: {
		color: "#0000004D",
		fontFamily: "Lexend-Medium",
		fontSize: 16,
		textAlign: "center"
	},
	subscribersCountDivider: {
		width: "60%",
		height: 1,
		backgroundColor: "#0000001A",
		marginHorizontal: "auto",
		marginBottom: 21
	}
});
