import React, { useRef } from "react";
import {
	Keyboard,
	NativeSyntheticEvent,
	Platform,
	StyleSheet,
	TextInput,
	TextInputKeyPressEventData,
	View
} from "react-native";

interface OTPGridInputProps {
	otp: string[];
	setOtp: React.Dispatch<React.SetStateAction<string[]>>;
	isError?: boolean;
}

export default function OTPGridInput({
	otp,
	setOtp,
	isError
}: OTPGridInputProps) {
	const inputRefs = Array(5)
		.fill(null)
		.map(() => useRef<TextInput>(null));

	const handleChange = (text: string, index: number) => {
		if (!/^\d?$/.test(text)) return;

		const newOtp = [...otp];
		newOtp[index] = text;
		setOtp(newOtp);

		if (text && index < 4) {
			inputRefs[index + 1].current?.focus();
		}

		if (index === 4 && text) {
			Keyboard.dismiss();
		}
	};

	const handleKeyPress = (
		event: NativeSyntheticEvent<TextInputKeyPressEventData>,
		index: number
	) => {
		if (event.nativeEvent.key === "Backspace") {
			if (otp[index] !== "") {
				const newOtp = [...otp];
				newOtp[index] = "";
				setOtp(newOtp);
			} else if (index > 0) {
				inputRefs[index - 1].current?.focus();
			}
		}
	};

	return (
		<View style={styles.container}>
			{otp.map((digit, index) => (
				<TextInput
					key={index}
					ref={inputRefs[index]}
					style={[
						styles.input,
						{
							borderColor: isError ? "red" : "#000000",
							color: isError ? "red" : "#000000"
						}
					]}
					value={digit}
					onChangeText={text => handleChange(text, index)}
					onKeyPress={event => handleKeyPress(event, index)}
					keyboardType="number-pad"
					maxLength={1}
					textAlign="center"
					autoFocus={index === 0}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		width: "100%",
		marginTop: 20
	},
	input: {
		width: 50,
		borderBottomWidth: 1,
		fontSize: 32,
		lineHeight: 40,
		textAlign: "center",
		marginHorizontal: 8,
		borderColor: "#000000",
		paddingBottom: Platform.OS === "ios" ? 10 : undefined
	}
});
