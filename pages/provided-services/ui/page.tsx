import { settingsService } from "@/shared/api/services/settings.service";
import { ProvidedServices } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import i18n from "@/shared/i18n";
import IconArrowLeftDark from "@/shared/icons/arrow-left-dark.svg";
import IconArrowLeft from "@/shared/icons/arrow-left.svg";
import NavBottomIconDark from "@/shared/icons/nav-bottom-dark.svg";
import NavBottomIcon from "@/shared/icons/nav-bottom.svg";
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

export const ProvidedServicesScreen = () => {
	const { t } = useTranslation();
	const { colors, mode } = useAppTheme();
	const router = useRouter();
	const currentLocale = i18n.language;

	const [data, setData] = useState<ProvidedServices>();

	useEffect(() => {
		const fetchData = async () => {
			const response = await settingsService.getProvidedServices({
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
						{t("manageService")}
					</Text>
					<View style={[styles.serviceCount, { backgroundColor: colors.text }]}>
						<Text
							style={[styles.serviceCountText, { color: colors.textReverse }]}
						>
							{data?.data.length} {t("service")}
						</Text>
					</View>
				</View>
				<View style={styles.services}>
					{data?.data.map(item => (
						<TouchableOpacity
							onPress={() =>
								router.push(`/settings/provided-services/${item.id}`)
							}
							key={item.id}
							style={[
								styles.service,
								{
									backgroundColor: colors.bgService,
									borderColor: colors.bgServiceBorder
								}
							]}
						>
							<View style={styles.titleRow}>
								<Text style={[styles.serviceTitle, { color: colors.text }]}>
									{item.name}
								</Text>
								<View style={styles.serviceNavIcon}>
									{mode === "light" ? <NavBottomIcon /> : <NavBottomIconDark />}
								</View>
							</View>
							<View style={styles.serviceCategory}>
								<Text
									style={[
										styles.serviceCategoryTitle,
										{ color: colors.categoryTitle }
									]}
								>
									{t("category")}:
								</Text>
								<Text
									style={[styles.serviceCategoryName, { color: colors.text }]}
								>
									{item.categories[0].name}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</View>
		</SafeAreaView>
	);
};

export const styles = StyleSheet.create({
	page: {
		flex: 1
	},

	box: {
		paddingBottom: 50
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		paddingTop: 18,
		paddingBottom: 10,
		paddingHorizontal: 24
	},
	headerTitle: {
		fontFamily: "Lexend-Regular",
		fontSize: 16
	},
	text: {
		fontSize: 16,
		fontFamily: "Lexend-Regular",
		marginTop: 20
	},
	serviceCount: {
		height: 24,
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		borderRadius: 4,
		paddingHorizontal: 4
	},
	serviceCountText: {
		fontSize: 16,
		fontFamily: "Lexend-Regular"
	},

	services: {},
	service: {
		borderTopWidth: 1,
		paddingVertical: 6,
		paddingBottom: 6,
		paddingHorizontal: 34
	},
	titleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16
	},
	serviceTitle: {
		fontSize: 16,
		fontFamily: "Lexend-Regular"
	},
	serviceNavIcon: {
		transform: [{ rotate: "270deg" }]
	},
	serviceCategory: {
		flexDirection: "row",
		gap: 4
	},
	serviceCategoryTitle: {
		fontSize: 12,
		fontFamily: "Lexend-Regular"
	},
	serviceCategoryName: { fontSize: 12, fontFamily: "Lexend-Regular" }
});
