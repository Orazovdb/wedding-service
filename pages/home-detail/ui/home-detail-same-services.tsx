import { Colors } from "@/constants/Colors";
import { HumanServicesByIdData, SimilarServices } from "@/shared/api/types";
import LocationIcon from "@/shared/icons/location-icon.svg";
import GoldenIcon from "@/shared/icons/status-golden.svg";
import NewIcon from "@/shared/icons/status-new.svg";
import PremiumIcon from "@/shared/icons/status-premium.svg";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";

const { width } = Dimensions.get("window");

const HomeDetailSameServices = ({
	data
}: {
	data: HumanServicesByIdData | undefined;
}) => {
	const router = useRouter();

	const categoryFlatListRef = useRef<FlatList<any>>(null);

	return (
		<View style={styles.sameServices}>
			<Text style={styles.title}>Meňzeş hyzmatlar</Text>
			<FlatList
				ref={categoryFlatListRef}
				data={data?.similar}
				keyExtractor={item => item.id.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ alignItems: "center" }}
				renderItem={({ item }: { item: SimilarServices }) => (
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
							style={[
								styles.categoryItem,
								item.status === "premium"
									? styles.categoryItemPremium
									: item.status === "golden"
									? styles.categoryItemGold
									: ""
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
											? "premium"
											: item.status === "golden"
											? `${"golden"}`
											: item.status === "new"
											? "täze"
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
											<Text style={styles.categoryUsername}>{firstWord}</Text>
											<Text style={styles.categoryUserSurName}>
												{secondWord}
											</Text>
										</>
									);
								})()
							) : (
								<Text style={styles.categoryUsername}>
									service-provider_{item?.id}
								</Text>
							)}
							<View style={styles.serviceDivider} />
							<Text style={styles.categoryName}>
								{item.categories[0]?.name}
							</Text>
							<Text style={styles.serviceName}>{item?.name}</Text>
							<View style={styles.serviceLocationWrapper}>
								<LocationIcon />
								{(() => {
									const [firstWord = "", secondWord = ""] =
										item.region.name.split(" ");
									return (
										<>
											<Text style={styles.serviceLocation}>
												{firstWord} {secondWord}, {item.region.province}
											</Text>
										</>
									);
								})()}
							</View>
							<View style={styles.serviceButtons}>
								<View style={styles.subscriptionsButton}>
									<Text style={styles.subscriptionsButtonText}>111k</Text>
									<Text style={styles.subscriptionsButtonText}>agza</Text>
								</View>
								<TouchableOpacity
									style={[
										styles.subscribeButton,
										item.status === "golden" && styles.subscribeButtonGold
									]}
								>
									<Text
										style={[
											styles.subscribeButtonText,
											item.status === "golden" && styles.subscribeButtonGoldText
										]}
									>
										Agza
									</Text>
									<Text
										style={[
											styles.subscribeButtonText,
											item.status === "golden" && styles.subscribeButtonGoldText
										]}
									>
										bol
									</Text>
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
};

export default HomeDetailSameServices;

export const styles = StyleSheet.create({
	sameServices: {
		paddingTop: 12,
		paddingBottom: 60,
		paddingHorizontal: 24
	},
	title: {
		fontFamily: "Lexend-Medium",
		fontSize: 16,
		color: "#000",
		marginBottom: 12
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
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1.51 },
		shadowOpacity: 0.25,
		shadowRadius: 3.02,
		elevation: 2,
		borderBottomWidth: 1,
		borderBottomColor: "#00000040",
		borderTopWidth: 1,
		borderTopColor: "#00000040",
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
		backgroundColor: Colors.dark.secondary,
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
		alignItems: "center",
		gap: 4,
		paddingVertical: 3,
		paddingHorizontal: 4,
		borderRadius: 5,
		backgroundColor: Colors.dark.primary,
		marginBottom: 12
	},
	serviceLocation: {
		fontSize: 10,
		fontFamily: "Lexend-Light",
		color: Colors.light.secondary
	},
	serviceButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 12
	},
	subscriptionsButton: {
		paddingVertical: 6.5,
		paddingHorizontal: 4.5,
		backgroundColor: Colors.light.secondary,
		borderRadius: 3
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
		color: Colors.light.secondary,
		fontFamily: "Lexend-Regular",
		textAlign: "center"
	},
	subscribeButtonGoldText: {
		color: "#fff"
	}
});
