import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { Login } from "@/shared/api/types";
import React from "react";
import { UseFormSetValue } from 'react-hook-form'
import { StyleSheet, Text, TextInput, View } from "react-native";

type props = {
	phone: string;
	setValue: UseFormSetValue<Login>
	handleClick: (data: Login) => void;
};

export const LoginForm = (props: props) => {
	return (
		<View>
			<Text style={styles.loginFormTitle}>Ulgama giriň</Text>
			<View style={styles.loginInputs}>
				<TextInput
					value={props.phone}
					onChangeText={value => props.setValue('phone', value)}
					placeholder="Adyňyz"
					style={styles.input}
				/>
			</View>
			<CustomButton
				title="Ugratmak"
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
	}
});
