import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SubscribersFilterModal } from "./ui/subscribers-filter";
import { SubscribersSubscribeSlider } from "./ui/subscribers-subscribe-slider";

export const SubscribersScreen = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedSubscribeId, setSelectedSubscribeId] = useState<string>("1");

	const handleModalOpen = () => {
		setIsModalVisible(true);
	};

	const handleModalClose = () => {
		setIsModalVisible(false);
	};

	return (
		<SafeAreaView style={styles.safeArea}>
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
			</View>
			<SubscribersFilterModal.Modal
				isModalVisible={isModalVisible}
				setIsModalVisible={handleModalClose}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.light.white
	},
	page: {
		paddingVertical: 24,
		paddingHorizontal: 16
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
	}
});
