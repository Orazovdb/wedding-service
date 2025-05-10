import Slider1 from "@/assets/images/main/slider-1.svg";
import Slider2 from "@/assets/images/main/slider-2.svg";
import Slider3 from "@/assets/images/main/slider-3.svg";
import { StyleSheet } from "react-native";
import { SlidesType } from "./type";

export const styles = StyleSheet.create({
	contentImage: {
		margin: "auto",
		marginTop: -10,
		objectFit: "contain"
	},

	contentImage2: {
		margin: "auto",
		marginTop: -30,
		objectFit: "contain"
	},

	contentImage3: {
		margin: "auto",
		marginTop: -6,
		objectFit: "contain"
	}
});

export const slides: SlidesType[] = [
	{
		id: "1",
		text: "Toy hyzmatlary",
		image: require("@/shared/images/login/slider-1.png"),
		contentTitle: "Ähli hyzmatlar bir jubigiňizde",
		contentImage: <Slider1 style={styles.contentImage} />
	},
	{
		id: "2",
		text: "Toy hyzmatlary",
		image: require("@/shared/images/login/slider-2.png"),
		contentTitle: "Ýigitler we Gyz Gelinler üçin ýörite kategoriýalar",
		contentImage: <Slider2 style={styles.contentImage2} />
	},
	{
		id: "3",
		text: "Toy hyzmatlary",
		image: require("@/shared/images/login/slider-3.png"),
		contentTitle: "Täze çatynjalar üçin umumy amatlyklar",
		contentImage: <Slider3 style={styles.contentImage3} />
	},
	{
		id: "4",
		text: "",
		contentTitle: ""
	}
];
