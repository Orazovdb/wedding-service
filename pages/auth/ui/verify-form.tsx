import CustomButton from "@/components/CustomButton";
import OTPGridInput from "@/components/OtpInput";
import { Verify } from "@/shared/api/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type props = {
	otp: string[];
	setOtp: React.Dispatch<React.SetStateAction<string[]>>;
	handleClick: (data: Verify) => void;
	phone: string;
};

export const VerifyForm = (props: props) => {
	return (
		<View>
			<Text style={styles.loginFormTitle}>
				({props.phone}) Telefon belginize iberilen tassyklaýyş kodyny giriziň
			</Text>
			<Text></Text>
			<View style={styles.loginInputs}>
				<OTPGridInput otp={props.otp} setOtp={props.setOtp} />
			</View>
			<CustomButton
				title="Ugratmak"
				onPress={() =>
					props.handleClick({ otp: props.otp.join(""), phone: props.phone })
				}
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
	}
});
