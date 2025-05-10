import IconAvatarCircle from "@/shared/icons/avatar-circle.svg";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SubscribersInfoBanner } from "./subscribers-info-banner";
import { SubscribersUnsubscribe } from "./subscribers-unsubscribe";

type Props = {
	isModalVisible: boolean;
	handleOpenModal: () => void;
	handleCloseModal: () => void;
	handleConfirm: () => void;
};

export const SubscribersInfo = (props: Props) => {
	return (
		<View style={styles.box}>
			<View style={styles.header}>
				<Text style={styles.userName}>Myrat Myradow</Text>
				<SubscribersUnsubscribe.Button
					handleConfirm={props.handleConfirm}
					isModalVisible={props.isModalVisible}
					handleOpenModal={props.handleOpenModal}
					handleCloseModal={props.handleCloseModal}
				/>
			</View>
			<View style={styles.categories}>
				<View style={styles.categoryItem}>
					<Text style={styles.categoryType}>Kategoriýa</Text>
					<Text style={styles.categoryTitle}>Mashyn bezegci</Text>
					<View style={styles.categoryDivider} />
					<Text style={styles.categoryService}>BMW</Text>
				</View>
				<View style={styles.categoryItem}>
					<Text style={styles.categoryType}>Salgy</Text>
					<Text style={styles.categoryTitle}>Gokdepe,Ahal (Gypjak metjit)</Text>
				</View>
				<View style={styles.categoryItem}>
					<Text style={styles.categoryType}>Agzalar</Text>
					<Text style={[styles.categoryTitle, { fontFamily: "Lexend-Medium" }]}>
						101 agza
					</Text>
					<View style={styles.categoryDivider} />
					<View style={styles.categorySubscribed}>
						<View style={styles.categorySubscribedDot} />
						<Text style={styles.categorySubscribedText}>Agza bolundy</Text>
					</View>
				</View>
			</View>
			<SubscribersInfoBanner />
			<TouchableOpacity style={styles.goProfileButton}>
				<IconAvatarCircle />
				<Text style={styles.goProfileButtonText}>Profile git</Text>
			</TouchableOpacity>
			<SubscribersUnsubscribe.Modal
				handleCloseModal={() => props.handleCloseModal()}
				handleConfirm={props.handleConfirm}
				isModalVisible={props.isModalVisible}
			/>
		</View>
	);
};

export const styles = StyleSheet.create({
	box: {
		borderColor: "#000000",
		borderWidth: 2,
		borderStyle: "solid",
		borderRadius: 6,
		paddingBottom: 20,
		marginHorizontal: 16,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 18,
		paddingTop: 12,
		paddingLeft: 10
	},

	userName: {
		fontSize: 14,
		fontFamily: "Lexend-Regular"
	},

	categories: {
		marginVertical: 14,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		rowGap: 10,
		columnGap: 10,
		marginHorizontal: 12
	},
	categoryItem: {
		flexBasis: "30%",
		borderRadius: 10,
		backgroundColor: "#0000000D",
		paddingVertical: 6,
		paddingHorizontal: 8
	},
	categoryType: {
		color: "#00000066",
		fontFamily: "Lexend-Regular",
		fontSize: 8,
		marginBottom: 8
	},
	categoryTitle: {
		fontSize: 11,
		color: "#000000",
		fontFamily: "Lexend-Regular",
		marginBottom: 6,
		textAlign: "center",
		marginHorizontal: "auto"
	},
	categoryDivider: {
		marginBottom: 6,
		marginHorizontal: "auto",
		width: "30%",
		height: 1,
		backgroundColor: "#00000066"
	},
	categoryService: {
		fontSize: 11,
		color: "#000000",
		fontFamily: "Lexend-Regular",
		textAlign: "center"
	},
	categorySubscribed: {
		marginTop: 6,
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
		justifyContent: "center"
	},
	categorySubscribedDot: {
		width: 6,
		height: 6,
		borderRadius: "50%",
		backgroundColor: "#5BB271"
	},
	categorySubscribedText: {
		fontFamily: "Lexend-Regular",
		fontSize: 11,
		color: "#5BB271"
	},

	goProfileButton: {
		width: "80%",
		borderRadius: 6,
		backgroundColor: "#000000",
		height: 36,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		marginHorizontal: "auto"
	},
	goProfileButtonText: {
		fontFamily: "Lexend-Regular",
		fontSize: 16,
		color: "#FFFFFF"
	}
});
