import Slider1 from "@/assets/images/main/slider-1.svg";
import Slider2 from "@/assets/images/main/slider-2.svg";
import Slider3 from "@/assets/images/main/slider-3.svg";

import CustomButton from "@/components/CustomButton";
import OTPInput from "@/components/OtpInput";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	FlatList,
	Image,
	ImageSourcePropType,
	Keyboard,
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	useColorScheme,
	View
} from "react-native";
import { useAuth } from "../store/AuthContext";

const { width, height } = Dimensions.get("window");

type SlidesType = {
	id: string;
	text?: string | undefined;
	image?: ImageSourcePropType | undefined;
	contentTitle?: string | undefined;
	contentImage?: React.ReactNode | undefined;
};

const Login = () => {
	const colorScheme = useColorScheme();
	const scrollX = useRef(new Animated.Value(0)).current;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isOtp, setIsOtp] = useState(false);
	const { login, isLoggedIn } = useAuth();
	const router = useRouter();

	const slides: SlidesType[] = [
		{
			id: "1",
			text: "Toy hyzmatlary",
			image: require("@/shared/images/login/slider-1.png"),
			contentTitle: "Ähli hyzmatlar bir jubigiňizde",
			contentImage: <Slider1 style={styles.contentImage} />
		},
		{
			id: "2",
			text: "Toy hyzmatlary",
			image: require("@/shared/images/login/slider-2.png"),
			contentTitle: "Ýigitler we Gyz Gelinler üçin ýörite kategoriýalar",
			contentImage: <Slider2 style={styles.contentImage2} />
		},
		{
			id: "3",
			text: "Toy hyzmatlary",
			image: require("@/shared/images/login/slider-3.png"),
			contentTitle: "Täze çatynjalar üçin umumy amatlyklar",
			contentImage: <Slider3 style={styles.contentImage3} />
		},
		// Add default values for slide 4
		{
			id: "4",
			text: "",
			contentTitle: ""
		}
	];

	const handleScroll = Animated.event(
		[{ nativeEvent: { contentOffset: { x: scrollX } } }],
		{ useNativeDriver: false, listener: () => Keyboard.dismiss() }
	);

	const handleMomentumScrollEnd = (event: any) => {
		const index = Math.round(event.nativeEvent.contentOffset.x / width);
		setCurrentIndex(index);
	};

	const handleSend = () => {
		setIsOtp(true);
	};

	const handleLogin = () => {
		login();
		router.replace("/home");
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
										<View style={styles.loginLogo}></View>
										<Text style={styles.loginTitle}>Toy hyzmatlary</Text>
									</View>
									<View style={styles.loginDivider} />
									<View style={styles.loginForm}>
										{!isOtp ? (
											<>
												<Text style={styles.loginFormTitle}>Ulgama giriň</Text>
												<View style={styles.loginInputs}>
													<TextInput
														placeholder="Adyňyz"
														value={email}
														onChangeText={setEmail}
														style={styles.input}
														placeholderTextColor="#00000066"
													/>
													<TextInput
														placeholder="Telefon nomeriňiz"
														value={password}
														onChangeText={setPassword}
														style={styles.input}
														placeholderTextColor="#00000066"
													/>
												</View>
												<CustomButton title="Ugratmak" onPress={handleSend} />
											</>
										) : (
											<>
												<Text style={styles.loginFormTitle}>
													Telefon nomeriňize iberilen tassyklaýyş kodyny giriziň
												</Text>
												<View style={styles.loginInputs}>
													<OTPInput />
												</View>
												<CustomButton
													title="Ulgama gir"
													onPress={handleLogin}
												/>
											</>
										)}
									</View>
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

export default Login;

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
		maxWidth: "80%",
		margin: "auto",
		textAlign: "center",
		marginTop: 30
	},
	contentImage: {
		margin: "auto",
		marginTop: -10,
		objectFit: "contain"
	},

	contentImage2: {
		margin: "auto",
		marginTop: -30,
		objectFit: "contain"
	},

	contentImage3: {
		margin: "auto",
		marginTop: -6,
		objectFit: "contain"
	},

	loginContainer: {
		marginTop: 60,
		width: "100%",
		paddingLeft: 42,
		paddingRight: 42
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
		maxWidth: "60%",
		marginBottom: 52
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
		marginBottom: 32
	},

	loginForm: {},

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

	pagination: {
		flexDirection: "row",
		marginBottom: Platform.OS === "ios" ? 0 : 30,
		marginTop: 30
	},
	dot: { width: 13, height: 13, borderRadius: "50%", margin: 5 }
});
