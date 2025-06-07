import { settingsService } from "@/shared/api/services/settings.service";
import { Settings } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import i18n from "@/shared/i18n";
import IconArrowLeftDark from "@/shared/icons/arrow-left-dark.svg";
import IconArrowLeft from "@/shared/icons/arrow-left.svg";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";

export const SettingsInfoScreen = () => {
	const { t } = useTranslation();
	const { colors, mode } = useAppTheme();
	const router = useRouter();
	const currentLocale = i18n.language;

	const [data, setData] = useState<Settings>();

	useEffect(() => {
		const fetchData = async () => {
			const response = await settingsService.getContacts({
				params: { lang: currentLocale }
			});
			setData(response);
		};

		fetchData();
	}, [data]);

	return (
		<SafeAreaView style={[styles.page, { backgroundColor: colors.bgPage }]}>
			<View style={styles.box}>
				<View style={styles.header}>
					<TouchableOpacity
						style={{ padding: 4 }}
						onPress={() => router.back()}
					>
						{mode === "light" ? <IconArrowLeft /> : <IconArrowLeftDark />}
					</TouchableOpacity>
					<Text style={[styles.headerTitle, { color: colors.text }]}>
						{t("addService")}
					</Text>
				</View>
				<Text style={[styles.text, { color: colors.text }]}>
					{data?.data.about_us}
				</Text>
			</View>
		</SafeAreaView>
	);
};

export const styles = StyleSheet.create({
	page: {
		flex: 1
	},

	box: {
		paddingVertical: 18,
		paddingHorizontal: 24
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6
	},
	headerTitle: {
		fontFamily: "Lexend-Regular",
		fontSize: 16
	},
	text: {
		fontSize: 16,
		fontFamily: "Lexend-Regular",
		marginTop: 20
	}
});
