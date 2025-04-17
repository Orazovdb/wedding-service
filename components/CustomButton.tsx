import React from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme
} from "react-native";

interface CustomButtonProps {
	title: string;
	onPress: () => void;
	backgroundColor?: string;
	textColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	backgroundColor = "#000000",
	textColor = "#ffffff"
}) => {
	const colorScheme = useColorScheme() ?? "light";

	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor }]}
			onPress={onPress}
			activeOpacity={0.7}
		>
			<Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		width: "100%",
		paddingVertical: 6.5,
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "center"
	},
	buttonText: {
		fontSize: 16,
		fontFamily: "Lexend-Light"
	}
});

export default CustomButton;
