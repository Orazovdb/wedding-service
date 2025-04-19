import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { HomeDetailAbout } from "./ui/home-detail-about";
import { HomeDetailBanner } from "./ui/home-detail-banner";
import { HomeDetailFeedback } from "./ui/home-detail-feedback";
import { HomeDetailProfile } from "./ui/home-detail-profile";
import HomeDetailSameServices from "./ui/home-detail-same-services";
import { HomeDetailContact } from "./ui/home-detail.contact";

const { width } = Dimensions.get("window");

export const HomeDynamicScreen = () => {
	const { id } = useLocalSearchParams();

	return (
		<ScrollView style={styles.container}>
			<HomeDetailBanner />
			<HomeDetailProfile />
			<HomeDetailAbout />
			<HomeDetailFeedback />
			<HomeDetailContact />
			<HomeDetailSameServices />
		</ScrollView>
	);
};

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.white
	},
	sliderContainer: {
		position: "relative",
		flexGrow: 1,
		width: width
	},
	backIcon: {
		position: "absolute",
		top: 12,
		left: 18
	}
});
