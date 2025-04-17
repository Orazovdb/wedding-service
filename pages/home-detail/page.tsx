import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { HomeDetailBanner } from "./ui/home-detail-banner";

const { width } = Dimensions.get("window");

export const HomeDynamicScreen = () => {
	const { id } = useLocalSearchParams();

	return (
		<ScrollView style={styles.container}>
			<HomeDetailBanner />
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
