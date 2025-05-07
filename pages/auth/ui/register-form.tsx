import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { Register } from "@/shared/api/types";
import React from "react";
import { UseFormSetValue } from "react-hook-form";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";

type props = {
	phone: string;
	name: string;
	setValue: UseFormSetValue<Register>;
	handleClick: (data: Register) => void;
};

export const RegisterForm = (props: props) => {
	return (
		<View>
			<Text style={styles.loginFormTitle}>Ulgam doredin</Text>
			<View style={styles.loginInputs}>
				<TextInput
					value={props.phone}
					onChangeText={value => props.setValue("name", value)}
					placeholder="Adyňyz"
					style={styles.input}
				/>
				<TextInput
					value={props.phone}
					onChangeText={value => props.setValue("phone", value)}
					placeholder="Telefon belginiz"
					style={styles.input}
				/>
			</View>
			<CustomButton
				title="Ugratmak"
				onPress={() =>
					props.handleClick({ phone: props.phone, name: props.name })
				}
			/>
			<TouchableOpacity>
				<Text>Do i you have any account?</Text>
			</TouchableOpacity>
		</View>
	);
};

export const styles = StyleSheet.create({
	loginFormTitle: {
		fontFamily: "Lexend-Regular",
		color: "#000000",
		fontSize: 32,
		lineHeight: 40
	},

	loginInputs: {
		marginTop: 64,
		marginBottom: 88
	},

	input: {
		borderWidth: 1,
		borderColor: `${Colors.light}`,
		borderRadius: 4,
		paddingTop: 7.5,
		paddingBottom: 7.5,
		paddingLeft: 6,
		paddingRight: 6,
		marginBottom: 12,
		width: "100%"
	}
});
