import { HumanServicesByIdData } from "@/shared/api/types";
import IconArrowRightMin from "@/shared/icons/arrow-right-min.svg";
import IconClose from "@/shared/icons/close-confirm-icon.svg";
import IconInfo from "@/shared/icons/info-icon.svg";
import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
	isModalVisible: boolean;
	handleOpenModal?: () => void;
	handleCloseModal: () => void;
	handleConfirm: () => void;
	data: HumanServicesByIdData | undefined;
};

const UnsubscribeButton = (props: Props) => {
	const { t } = useTranslation();
	return (
		<TouchableOpacity
			onPress={props.handleOpenModal}
			style={styles.unsubscribeButton}
		>
			<IconArrowRightMin />
			<Text style={styles.unsubscribeButtonText}>{t("unSubscribe")}</Text>
		</TouchableOpacity>
	);
};

const UnsubscribeModal = ({
	isModalVisible,
	handleCloseModal,
	handleConfirm,
	data
}: Props) => {
	const { t } = useTranslation();
	return (
		<Modal
			transparent
			animationType="fade"
			visible={isModalVisible}
			onRequestClose={() => handleCloseModal()}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<View style={styles.modalTitleWrapper}>
						<IconInfo />
						<Text style={styles.modalText}>
							{t("reallyWant")}{" "}
							<Text style={{ fontFamily: "Lexend-Medium" }}>
								“{data?.service?.name}”
							</Text>{" "}
							{t("user")}{" "}
							<Text style={{ fontFamily: "Lexend-Medium" }}>
								{t("toUnsubscribe")}
							</Text>
						</Text>
						<TouchableOpacity onPress={handleCloseModal}>
							<IconClose />
						</TouchableOpacity>
					</View>
					<View style={styles.modalButtons}>
						<TouchableOpacity
							onPress={() => handleCloseModal()}
							style={styles.cancelButton}
						>
							<Text style={styles.cancelText}>{t("cancel")}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleConfirm}
							style={styles.confirmButton}
						>
							<Text style={styles.confirmText}>{t("confirm")}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export const SubscribersUnsubscribe = {
	Button: UnsubscribeButton,
	Modal: UnsubscribeModal
};

const styles = StyleSheet.create({
	unsubscribeButton: {
		paddingVertical: 2,
		paddingHorizontal: 8,
		flexDirection: "row",
		alignItems: "center",
		gap: 4
	},
	unsubscribeButtonText: {
		fontSize: 12,
		color: "#FF2D55",
		textDecorationLine: "underline"
	},

	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center"
	},
	modalContent: {
		backgroundColor: "#FFD2CF",
		paddingVertical: 13,
		paddingHorizontal: 18,
		borderRadius: 20,
		width: "75%",
		alignItems: "center"
	},
	modalTitleWrapper: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 4,
		marginBottom: 40,
		marginHorizontal: 10
	},
	modalText: {
		fontSize: 14,
		fontFamily: "Lexend-Light",
		color: "#000000",
		lineHeight: 18
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		gap: 14
	},
	cancelButton: {
		flex: 1,
		padding: 4.5,
		alignItems: "center",
		borderRadius: 10,
		backgroundColor: "#000000"
	},
	confirmButton: {
		flex: 1,
		padding: 4.5,
		alignItems: "center",
		borderRadius: 10,
		backgroundColor: "#C0FFB9"
	},
	cancelText: { color: "#FFFFFF", fontSize: 14, fontFamily: "Lexend-Regular" },
	confirmText: { color: "#000", fontSize: 14, fontFamily: "Lexend-Regular" }
});
