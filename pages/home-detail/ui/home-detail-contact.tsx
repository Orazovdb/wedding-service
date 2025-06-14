import { Colors } from "@/constants/Colors";
import { HumanServicesByIdData } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import IconCall from "@/shared/icons/call-icon.svg";
import IconDownloadDark from "@/shared/icons/download-icon-dark.svg";
import IconDownload from "@/shared/icons/download-icon.svg";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const HomeDetailContact = ({
	data
}: {
	data: HumanServicesByIdData | undefined;
}) => {
	const { colors, mode } = useAppTheme();

	const handleCall = (phone?: string) => {
		if (!phone) return;
		const formattedPhoneNumber = `tel:+993${phone}`;
		Linking.canOpenURL(formattedPhoneNumber)
			.then(supported => {
				if (!supported) {
					Alert.alert(
						"Telefon açylyp bilinmedi",
						`Telefon belgisi: +993${phone}`
					);
				} else {
					Linking.openURL(formattedPhoneNumber);
				}
			})
			.catch(err => console.error("Call error:", err));
	};

	const router = useRouter();

	const handleDownload = (pdf?: string) => {
		if (!pdf) return;
		const url = pdf;
		router.push({ pathname: "/(protected)/pdf-viewer", params: { uri: url } });
	};
	const { t } = useTranslation();

	return (
		<View style={styles.contact}>
			<TouchableOpacity
				onPress={() => handleCall(data?.service.phone)}
				style={styles.callButton}
			>
				<IconCall />
				<Text style={styles.callButtonText}>{t("call")}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => handleDownload(data?.service.catalog)}
				style={[styles.catalogButton, { borderColor: colors.text }]}
			>
				<Text style={[styles.catalogButtonText, { color: colors.text }]}>
					{t("catalog")}
				</Text>
				{mode === "light" ? <IconDownload /> : <IconDownloadDark />}
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	contact: {
		paddingVertical: 16,
		paddingHorizontal: 24,
		flexDirection: "row",
		justifyContent: "space-between",
		borderColor: "#BFBFBF",
		borderTopWidth: 1,
		borderBottomWidth: 1
	},
	callButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: Colors.dark.secondary,
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		backgroundColor: Colors.dark.primary,
		flex: 1,
		marginRight: 16
	},
	callButtonText: {
		fontSize: 16,
		fontFamily: "Lexend-Bold"
	},
	catalogButton: {
		borderRadius: 4,
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingVertical: 4,
		paddingHorizontal: 8
	},
	catalogButtonText: {
		fontSize: 12,
		fontFamily: "Lexend-Regular"
	}
});
