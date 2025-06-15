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
import { useTranslation } from "react-i18next";
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
	const { t } = useTranslation();

	useEffect(() => {
		register("phone", {
			required: t("phoneNotEmpty"),
			pattern: {
				value: /^[6]\d{7}$/,
				message: t("phoneMinWords")
			}
		});
	}, [register]);

	return (
		<View>
			<Text style={styles.loginFormTitle}>{t("loginAccount")}</Text>
			<View style={styles.loginInputs}>
				<View style={{ marginBottom: 10 }}>
					<Controller
						control={control}
						name="phone"
						rules={{
							required: t("phoneNotEmpty"),
							pattern: {
								value: /^[6]\d{7}$/,
								message: t("phoneMinWords")
							}
						}}
						render={({ field: { onChange, value } }) => (
							<View style={styles.inputWrapper}>
								<Text>+993</Text>
								<TextInput
									placeholder="6* ** ** **"
									value={value}
									onChangeText={onChange}
									keyboardType="number-pad"
									style={styles.input}
								/>
							</View>
						)}
					/>
					{errors.phone ? (
						<Text style={styles.errorText}>{errors.phone.message}</Text>
					) : null}
				</View>
			</View>
			<CustomButton title={t("send")} onPress={() => handleClick({ phone })} />
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
	inputWrapper: {
		borderWidth: 1,
		borderColor: `${Colors.light}`,
		borderRadius: 4,
		paddingVertical: 7.5,
		paddingHorizontal: 6,
		flexDirection: "row",
		gap: 4,
		marginBottom: 12
	},
	input: {
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
