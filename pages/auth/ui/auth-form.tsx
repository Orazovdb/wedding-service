import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { Auth } from "@/shared/api/types";
import React, { useEffect } from "react";
import {
	Control,
	Controller,
	FieldErrors,
	UseFormRegister,
	UseFormSetValue
} from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
	phone: string;
	setValue: UseFormSetValue<Auth>;
	register: UseFormRegister<Auth>;
	errors: FieldErrors<Auth>;
	control: Control<Auth>;
	handleClick: (data: Auth) => void;
};

export const AuthForm = ({
	phone,
	register,
	errors,
	handleClick,
	control
}: Props) => {
	useEffect(() => {
		register("phone", {
			required: "Telefon belgiňiz boş bolmaly däl",
			pattern: {
				value: /^[6]\d{7}$/,
				message: "Telefon belgi 8 sany san we 6 bilen başlamaly"
			}
		});
	}, [register]);

	return (
		<View>
			<Text style={styles.loginFormTitle}>Ulgam doredin</Text>
			<View style={styles.loginInputs}>
				<View style={{ marginBottom: 10 }}>
					<Controller
						control={control}
						name="phone"
						rules={{
							required: "Telefon belgiňiz boş bolmaly däl",
							pattern: {
								value: /^[6]\d{7}$/,
								message: "Telefon belgi 8 sany san we 6 bilen başlamaly"
							}
						}}
						render={({ field: { onChange, value } }) => (
							<TextInput
								placeholder="Telefon belginiz"
								value={value}
								onChangeText={onChange}
								keyboardType="number-pad"
								style={styles.input}
							/>
						)}
					/>
					{errors.phone && (
						<Text style={styles.errorText}>{errors.phone.message}</Text>
					)}
				</View>
			</View>
			<CustomButton title="Ulgama gir" onPress={() => handleClick({ phone })} />
		</View>
	);
};

const styles = StyleSheet.create({
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
		paddingVertical: 7.5,
		paddingHorizontal: 6,
		marginBottom: 12,
		width: "100%"
	},
	accText: {
		fontSize: 12,
		color: "#000",
		fontFamily: "Lexend-Regular",
		textDecorationLine: "underline"
	},
	errorText: {
		color: "red",
		fontSize: 12,
		marginTop: -8
	}
});
