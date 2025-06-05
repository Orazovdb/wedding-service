import { Colors } from "@/constants/Colors";
import { servicesService } from "@/shared/api/services/services.service";
import { Services } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import CategoryIconDark from "@/shared/icons/category-icon-dark.svg";
import CategoryIcon from "@/shared/icons/category-icon.svg";
import LocationIcon from "@/shared/icons/location-icon.svg";
import GoldenIcon from "@/shared/icons/status-golden.svg";
import NewIcon from "@/shared/icons/status-new.svg";
import PremiumIcon from "@/shared/icons/status-premium.svg";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { Home } from "../types";

interface props extends Home {}

const { width } = Dimensions.get("window");

export const HomeServices = ({
	data,
	onToggleFollow
}: {
	data?: props;
	onToggleFollow: () => void;
}) => {
	const { colors, mode } = useAppTheme();
	const { t } = useTranslation();

	const router = useRouter();

	const toggleFollow = async (service_id: number) => {
		await servicesService.toggleFollowService({ service_id });
		onToggleFollow();
	};

	const categoryFlatListRef = useRef<FlatList<Services>>(null);
	return data?.categories?.map(categoryItem => (
		<View style={styles.services} key={categoryItem.id}>
			<View style={styles.servicesTitleBlock}>
				<Text style={[styles.servicesTitle, { color: colors.text }]}>
					{categoryItem.name}
				</Text>
				<TouchableOpacity
					onPress={() =>
						router.push({
							pathname: `/(protected)/categories/[categoryDetail]/[id]`,
							params: {
								categoryDetail: categoryItem.id,
								id: "all"
							}
						})
					}
					style={[
						styles.servicesCategoryButton,
						{ backgroundColor: colors.bgSeeMoreBtn }
					]}
				>
					{mode === "light" ? <CategoryIcon /> : <CategoryIconDark />}
					<Text
						style={[styles.servicesCategoryButtonText, { color: colors.text }]}
					>
						{t("seeAll")}
					</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				ref={categoryFlatListRef}
				data={categoryItem.services}
				keyExtractor={categoryItem => String(categoryItem.id)}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ alignItems: "center" }}
				renderItem={({ item }: { item: Services }) => (
					<View style={styles.categoryList}>
						<TouchableOpacity
							onPress={() =>
								router.push({
									pathname: `/home/[id]`,
									params: {
										id: item.id
									}
								})
							}
							activeOpacity={0.6}
							style={[
								styles.categoryItem,
								item.status === "premium"
									? styles.categoryItemPremium
									: item.status === "golden"
									? styles.categoryItemGold
									: "",
								{
									backgroundColor: colors.bgServiceItem,
									shadowColor: colors.bgSeeMoreBtn
								}
							]}
						>
							{item.status !== "normal" && (
								<View
									style={[
										styles.categoryItemStatus,
										item.status === "premium"
											? styles.categoryItemStatusPremium
											: item.status === "golden"
											? styles.categoryItemStatusGold
											: item.status === "new"
											? styles.categoryItemStatusNew
											: ""
									]}
								>
									<Text style={styles.categoryItemStatusText}>
										{item.status === "premium"
											? t("premium")
											: item.status === "golden"
											? t("golden")
											: item.status === "new"
											? t("new")
											: ""}
									</Text>
									{item.status === "premium" ? (
										<PremiumIcon />
									) : item.status === "golden" ? (
										<GoldenIcon />
									) : item.status === "new" ? (
										<NewIcon />
									) : null}
								</View>
							)}
							<Image
								source={{ uri: item.logo }}
								style={styles.categoryProfileImg}
							/>
							{item.name ? (
								(() => {
									const [firstWord = "", secondWord = ""] =
										item.name.split(" ");
									return (
										<>
											<Text
												style={[
													styles.categoryUsername,
													{ color: colors.text }
												]}
											>
												{firstWord}
											</Text>
											<Text
												style={[
													styles.categoryUserSurName,
													{ color: colors.text }
												]}
											>
												{secondWord}
											</Text>
										</>
									);
								})()
							) : (
								<Text style={[styles.categoryUsername, { color: colors.text }]}>
									service-provider_{item.id}
								</Text>
							)}

							<View
								style={[
									styles.serviceDivider,
									{ backgroundColor: colors.text }
								]}
							/>
							<Text style={[styles.categoryName, { color: colors.text }]}>
								{categoryItem.name}
							</Text>
							<Text style={[styles.serviceName, { color: colors.text }]}>
								{item.name}
							</Text>
							<View style={styles.serviceLocationWrapper}>
								<LocationIcon />
								{(() => {
									const [firstWord = "", secondWord = ""] =
										item.region.name.split(" ");
									return (
										<>
											<Text style={styles.serviceLocation}>
												{firstWord} {secondWord.slice(0, 1)}.,{" "}
												{item.region.province.slice(0, 4)}
											</Text>
										</>
									);
								})()}
							</View>
							<View style={styles.serviceButtons}>
								<View style={styles.subscriptionsButton}>
									<Text style={styles.subscriptionsButtonText}>
										{item.followers_count}
									</Text>
									<Text style={styles.subscriptionsButtonText}>
										{t("subscriber")}
									</Text>
								</View>
								{item.is_followed ? (
									<TouchableOpacity
										onPress={() => toggleFollow(item.id)}
										style={[
											styles.subscribeButton,
											mode === "dark"
												? { backgroundColor: "#000", borderColor: colors.text }
												: { backgroundColor: colors.white },
											item.status === "golden" && styles.subscribeButtonGold
										]}
									>
										<Text
											style={[
												styles.subscribeButtonText,
												{ color: colors.text },
												item.status === "golden" &&
													styles.subscribeButtonGoldText
											]}
										>
											{t("unSubscribe")}
										</Text>
									</TouchableOpacity>
								) : (
									<TouchableOpacity
										onPress={() => toggleFollow(item.id)}
										style={[
											styles.subscribeButton,
											mode === "dark"
												? { backgroundColor: "", borderColor: colors.text }
												: { backgroundColor: colors.white },
											item.status === "golden" && styles.subscribeButtonGold
										]}
									>
										<Text
											style={[
												styles.subscribeButtonText,
												{ color: colors.text },
												item.status === "golden" &&
													styles.subscribeButtonGoldText
											]}
										>
											{t("subscribe")}
										</Text>
									</TouchableOpacity>
								)}
							</View>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	));
};

export const styles = StyleSheet.create({
	services: {
		width: "100%",
		marginBottom: 20,
		paddingLeft: 20
	},
	servicesTitleBlock: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 16,
		paddingRight: 20
	},
	servicesTitle: {
		fontSize: 16,
		fontWeight: "600"
	},
	servicesCategoryButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
		padding: 2
	},
	servicesCategoryButtonText: {
		fontSize: 12,
		fontWeight: "400"
	},
	categoryList: {
		width: width / 2.6,
		paddingRight: 10,
		paddingVertical: 10,
		paddingLeft: 4
	},
	categoryItem: {
		paddingTop: 2,
		paddingBottom: 8,
		paddingVertical: 12,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.8,
		shadowRadius: 3.02,
		elevation: 3,
		borderBottomWidth: 1,
		borderBottomColor: "#FFFFFF40",
		borderTopWidth: 2,
		borderTopColor: "#FFFFFF40",
		alignItems: "center",
		borderRadius: 4,
		gap: 0,
		position: "relative"
	},
	categoryItemPremium: {
		backgroundColor: "#2FD2FF33",
		elevation: 0
	},
	categoryItemGold: {
		backgroundColor: "rgba(232, 200, 96, 0.538)",
		elevation: 0
	},

	categoryItemStatus: {
		position: "absolute",
		left: 0,
		top: 0,
		borderRadius: 4,
		backgroundColor: "transparent",
		height: 16,
		paddingHorizontal: 3,
		alignItems: "center",
		justifyContent: "center",
		borderBottomLeftRadius: 0,
		borderTopEndRadius: 0,
		flexDirection: "row",
		gap: 5
	},
	categoryItemStatusPremium: {
		backgroundColor: "#2FD2FF"
	},
	categoryItemStatusGold: {
		backgroundColor: "#D4AF37"
	},
	categoryItemStatusNew: {
		backgroundColor: "#5BB271"
	},

	categoryItemStatusText: {
		color: "#fff",
		fontSize: 8,
		fontFamily: "Lexend-Regular"
	},

	categoryProfileImg: {
		width: 40,
		height: 40,
		borderRadius: 45 / 2
	},
	categoryUsername: {
		fontSize: 12,
		fontFamily: "Lexend-Regular",
		lineHeight: 13
	},
	categoryUserSurName: {
		fontSize: 12,
		fontFamily: "Lexend-Regular",
		lineHeight: 13,
		marginBottom: 6
	},
	serviceDivider: {
		width: "50%",
		height: 1,
		marginBottom: 6
	},
	categoryName: {
		fontSize: 10,
		fontFamily: "Lexend-ExtraLight",
		color: Colors.light.secondary,
		marginBottom: 2
	},
	serviceName: {
		fontSize: 10,
		fontFamily: "Lexend-Regular",
		color: Colors.light.secondary,
		marginBottom: 4
	},
	serviceLocationWrapper: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 4,
		paddingVertical: 3,
		paddingHorizontal: 4,
		borderRadius: 5,
		backgroundColor: Colors.dark.primary,
		marginBottom: 12,
		wordWrap: "wrap",
		flexWrap: "wrap",
		maxWidth: "90%",
		marginHorizontal: "auto"
	},
	serviceLocation: {
		fontSize: 10,
		fontFamily: "Lexend-Light",
		color: Colors.light.secondary,
		textAlign: "center"
	},
	serviceButtons: {
		gap: 4,
		width: "100%",
		paddingHorizontal: 12
	},
	subscriptionsButton: {
		paddingVertical: 2.5,
		paddingHorizontal: 4.5,
		backgroundColor: Colors.light.secondary,
		borderRadius: 3,
		flexDirection: "row",
		justifyContent: "center",
		gap: 6
	},
	subscriptionsButtonText: {
		fontSize: 10,
		color: "#FFF1F1",
		fontFamily: "Lexend-Regular",
		textAlign: "center"
	},
	subscribeButton: {
		paddingVertical: 6.5,
		paddingHorizontal: 4.5,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: "#000"
	},
	subscribeButtonGold: {
		backgroundColor: "#D4AF37",
		borderColor: "transparent"
	},
	subscribeButtonText: {
		fontSize: 10,

		fontFamily: "Lexend-Regular",
		textAlign: "center",
		wordWrap: "wrap"
	},
	subscribeButtonGoldText: {
		color: "#fff"
	}
});
