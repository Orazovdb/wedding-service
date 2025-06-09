import { Colors } from "@/constants/Colors";
import { authService } from "@/shared/api/services/auth.service";
import type { Auth } from "@/shared/api/types";
import { useAuth } from "@/shared/store/AuthContext";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
	Animated,
	Dimensions,
	FlatList,
	Image,
	Keyboard,
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View
} from "react-native";
import { slides } from "./data";
import { AuthForm } from "./ui/auth-form";
import { VerifyForm } from "./ui/verify-form";

const { width, height } = Dimensions.get("window");

export const AuthScreen = () => {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const scrollX = useRef(new Animated.Value(0)).current;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isOtp, setIsOtp] = useState(false);
	const { login, isLoggedIn } = useAuth();
	const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);

	const {
		register,
		setValue,
		watch,
		handleSubmit,
		formState: { errors },
		control
	} = useForm<Auth>({
		defaultValues: { phone: "" }
	});

	useEffect(() => {
		const checkToken = async () => {
			if (isLoggedIn) {
				router.push("/home");
			}
		};
		checkToken();
	}, [isLoggedIn]);

	const phone = watch("phone");

	const handleScroll = Animated.event(
		[{ nativeEvent: { contentOffset: { x: scrollX } } }],
		{ useNativeDriver: false, listener: () => Keyboard.dismiss() }
	);

	const handleMomentumScrollEnd = (event: any) => {
		const index = Math.round(event.nativeEvent.contentOffset.x / width);
		setCurrentIndex(index);
	};

	const handleAuth = async (data: Auth) => {
		try {
			const response = await authService.login(data);
			if (response.success) {
				setIsOtp(true);
			}
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	const [isOtpError, setIsOtpError] = useState(false);

	const handleVerify = async () => {
		try {
			await login({ otp: otp.join(""), phone });
		} catch (error: any) {
			if (error?.response?.status === 422) {
				setIsOtpError(true);
			}
		}
	};

	return (
		<SafeAreaView style={styles.safeContainer}>
			<View style={styles.container}>
				<FlatList
					data={slides}
					keyExtractor={item => item.id}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onScroll={handleScroll}
					onMomentumScrollEnd={handleMomentumScrollEnd}
					renderItem={({ item, index }) => (
						<View style={styles.slide}>
							{index !== 3 && (
								<>
									<View style={styles.imageContainer}>
										<Image source={item.image} style={styles.image} />
										<Text style={styles.absoluteTitle}>{item.text}</Text>
									</View>
									<View style={styles.content}>
										<Text style={styles.contentTitle}>{item.contentTitle}</Text>
										{item.contentImage && item.contentImage}
									</View>
								</>
							)}
							{index === 3 && (
								<View style={styles.loginContainer}>
									<View style={styles.loginTitleBox}>
										<View style={styles.loginLogo} />
										<Text style={styles.loginTitle}>TMTOY</Text>
									</View>
									<View style={styles.loginDivider} />
									{!isOtp ? (
										<AuthForm
											phone={watch("phone") || ""}
											setValue={setValue}
											handleClick={() => handleSubmit(handleAuth)()}
											errors={errors}
											register={register}
											control={control}
										/>
									) : (
										<VerifyForm
											handleClick={handleVerify}
											phone={phone}
											otp={otp}
											setOtp={setOtp}
											isError={isOtpError}
										/>
									)}
								</View>
							)}
						</View>
					)}
				/>
				<View style={styles.pagination}>
					{slides.map((_, i) => (
						<View
							key={i}
							style={[
								styles.dot,
								{
									backgroundColor:
										i === currentIndex
											? Colors[colorScheme ?? "light"].secondary
											: Colors[colorScheme ?? "light"].primary
								}
							]}
						/>
					))}
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
		backgroundColor: "white"
	},
	container: {
		flex: 1,
		alignItems: "center"
	},

	slide: { width },
	imageContainer: {
		width: "100%",
		height: height * 0.48,
		position: "relative"
	},

	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover"
	},
	absoluteTitle: {
		position: "absolute",
		top: (StatusBar.currentHeight || 20) + 160,
		left: 32,
		fontSize: 64,
		lineHeight: 80,
		color: "white",
		fontFamily: "Lexend-Regular"
	},

	text: { fontSize: 24, textAlign: "center", marginTop: 16 },

	content: {},
	contentTitle: {
		fontFamily: "Lexend-Regular",
		fontSize: 32,
		lineHeight: 40,
		color: "#000",
		maxWidth: "100%",
		margin: "auto",
		textAlign: "center",
		marginTop: 30
	},

	loginContainer: {
		marginTop: 40,
		width: "100%",
		paddingLeft: 32,
		paddingRight: 32
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

	loginTitleBox: {
		flexDirection: "row",
		alignItems: "center",
		gap: 17,
		maxWidth: "80%",
		marginBottom: 32
	},
	loginLogo: {
		backgroundColor: "#D9D9D9",
		borderRadius: 4,
		width: 70,
		height: 70
	},
	loginTitle: {
		fontSize: 30,
		lineHeight: 37,
		color: "#00B92E",
		fontFamily: "Lexend-Medium"
	},

	loginDivider: {
		width: 150,
		height: 1,
		backgroundColor: "#C9C8C8",
		margin: "auto",
		marginBottom: 22
	},

	loginForm: {},

	loginFormTitle: {
		fontFamily: "Lexend-Regular",
		color: "#000000",
		fontSize: 32,
		lineHeight: 40
	},

	loginInputs: {
		marginTop: 34,
		marginBottom: 88
	},

	pagination: {
		flexDirection: "row",
		marginBottom: Platform.OS === "ios" ? 0 : 30,
		marginTop: 30
	},
	dot: { width: 13, height: 13, borderRadius: "50%", margin: 5 }
});
