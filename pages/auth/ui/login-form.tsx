import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { Login } from "@/shared/api/types";
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
	setValue: UseFormSetValue<Login>;
	handleClick: (data: Login) => void;
	changeForm: () => void;
};

export const LoginForm = (props: props) => {
	return (
		<View>
			<Text style={styles.loginFormTitle}>Ulgama giriň</Text>
			<View style={styles.loginInputs}>
				<TextInput
					value={props.phone}
					onChangeText={value => props.setValue("phone", value)}
					placeholder="Telefon nomerniniz"
					style={styles.input}
				/>
				<TouchableOpacity
					onPress={props.changeForm}
					style={{ marginLeft: "auto" }}
				>
					<Text style={styles.accText}>Do i you have not any account?</Text>
				</TouchableOpacity>
			</View>
			<CustomButton
				title="Login"
				onPress={() => props.handleClick({ phone: props.phone })}
			/>
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
	},
	accText: {
		fontSize: 12,
		color: "#000",
		fontFamily: "Lexend-Regular",
		textDecorationLine: "underline"
	}
});
