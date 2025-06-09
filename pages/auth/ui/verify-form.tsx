import CustomButton from "@/components/CustomButton";
import OTPGridInput from "@/components/OtpInput";
import { Verify } from "@/shared/api/types";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

type props = {
	otp: string[];
	setOtp: React.Dispatch<React.SetStateAction<string[]>>;
	handleClick: (data: Verify) => void;
	phone: string;
	isError: boolean;
};

export const VerifyForm = (props: props) => {
	const { t } = useTranslation();
	const joinedOtp = props.otp.join("");

	useEffect(() => {
		if (joinedOtp.length === 5) {
			props.handleClick({ otp: joinedOtp, phone: props.phone });
		}
	}, [joinedOtp]);

	return (
		<View>
			<Text style={styles.loginFormTitle}>
				({props.phone}) {t("otpText")}
			</Text>
			<View style={styles.loginInputs}>
				<OTPGridInput
					otp={props.otp}
					setOtp={props.setOtp}
					isError={props.isError}
				/>
			</View>
			<CustomButton
				title={t("login")}
				onPress={() =>
					props.handleClick({ otp: joinedOtp, phone: props.phone })
				}
			/>
		</View>
	);
};

export const styles = StyleSheet.create({
	loginFormTitle: {
		fontFamily: "Lexend-Regular",
		color: "#000000",
		fontSize: 24,
		lineHeight: 40
	},
	loginInputs: {
		marginTop: 24,
		marginBottom: 58
	}
});
