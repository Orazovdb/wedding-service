import { Colors } from "@/constants/Colors";
import { profileService } from "@/shared/api/services/profile.service";
import { servicesService } from "@/shared/api/services/services.service";
import { settingsService } from "@/shared/api/services/settings.service";
import { HumanServicesByIdData } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import i18n from "@/shared/i18n";
import IconArrowLeftDark from "@/shared/icons/arrow-left-dark.svg";
import IconArrowLeft from "@/shared/icons/arrow-left.svg";
import IconCrash from "@/shared/icons/settings/crash.svg";
import IconImageUpload from "@/shared/icons/settings/image-upload.svg";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Alert,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";

export const ProvidedServicesDetailScreen = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const { mode, colors } = useAppTheme();
	const [data, setData] = useState<HumanServicesByIdData | undefined>();
	const currentLocale = i18n.language;
	const { id } = useLocalSearchParams();

	const [serviceName, setServiceName] = useState("");
	const [description, setDescription] = useState("");
	const [pricing, setPricing] = useState("");
	const [booking, setBooking] = useState("");
	const [contact, setContact] = useState("");
	const [imageUri, setImageUri] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await servicesService.getServicesById(
				id as string,
				currentLocale
			);
			setData(response);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (data?.service?.name) {
			setServiceName(data.service.name);
		}
		if (data?.service.description) {
			setDescription(data.service.description);
		}
		if (data?.service.booking) {
			setBooking(data.service.booking.join(","));
		}
		if (data?.service.pricing) {
			setPricing(data.service.pricing.join(","));
		}
		if (data?.service.contacts) {
			setContact(data.service.contacts.join(","));
		}
	}, [data]);

	const pickImage = async () => {
		const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!permission.granted) {
			Alert.alert(
				"Permission required",
				"We need camera roll permissions to upload images."
			);
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1
		});

		if (!result.canceled) {
			const uri = result.assets[0].uri;
			setImageUri(uri);
			await uploadImageHandler(uri);
		}
	};

	const uploadImageHandler = async (uri: string) => {
		const filename = uri.split("/").pop() || "upload.jpg";
		const match = /\.(\w+)$/.exec(filename);
		const type = match ? `image/${match[1]}` : `image`;

		const formData = new FormData();
		formData.append("image", {
			uri,
			name: filename,
			type
		} as any);

		try {
			await profileService.uploadImage(id.toString(), formData);
			Alert.alert("Success");
			const fetchData = async () => {
				const response = await servicesService.getServicesById(
					id as string,
					currentLocale
				);
				setData(response);
			};
			fetchData();
		} catch (error) {
			Alert.alert(
				"Upload failed",
				"Something went wrong while uploading image."
			);
		}
	};

	const handleDeleteImage = async (imageId: string) => {
		await profileService.deleteImage(id as string, imageId);
		const fetchData = async () => {
			const response = await servicesService.getServicesById(
				id as string,
				currentLocale
			);
			setData(response);
		};
		fetchData();
	};

	const putService = async () => {
		try {
			const existingName = data?.service?.name ?? "";
			const existingDescription = data?.service?.description ?? "";
			const existingPricing = data?.service?.pricing.join(",") ?? "";
			const existingBooking = data?.service?.booking.join(",") ?? "";
			const existingContact = data?.service?.contacts.join(",") ?? "";

			const namePayload: Record<string, string> = {
				tk: currentLocale === "tk" ? serviceName : existingName || "",
				ru: currentLocale === "ru" ? serviceName : existingName || "",
				en: currentLocale === "en" ? serviceName : existingName || ""
			};

			const descriptionPayload: Record<string, string> = {
				tk: currentLocale === "tk" ? description : existingDescription || "",
				ru: currentLocale === "ru" ? description : existingDescription || "",
				en: currentLocale === "en" ? description : existingDescription || ""
			};

			const pricingPayload: Record<string, string> = {
				tk: currentLocale === "tk" ? pricing : existingPricing || "",
				ru: currentLocale === "ru" ? pricing : existingPricing || "",
				en: currentLocale === "en" ? pricing : existingPricing || ""
			};

			const bookingPayload: Record<string, string> = {
				tk: currentLocale === "tk" ? booking : existingBooking || "",
				ru: currentLocale === "ru" ? booking : existingBooking || "",
				en: currentLocale === "en" ? booking : existingBooking || ""
			};

			const contactsPayload: Record<string, string> = {
				tk: currentLocale === "tk" ? contact : existingContact,
				ru: currentLocale === "ru" ? contact : existingContact,
				en: currentLocale === "en" ? contact : existingContact
			};

			const payload = {
				name: namePayload,
				phone: data?.service.phone ?? "",
				description: descriptionPayload,
				pricing: pricingPayload,
				booking: bookingPayload,
				contacts: contactsPayload,
				_method: "PUT"
			};

			console.log("PATCH payload", JSON.stringify(payload, null, 2));

			await settingsService.patchProvidedServices(String(id), payload);

			const response = await servicesService.getServicesById(
				id as string,
				currentLocale
			);
			setData(response);
			Alert.alert("Success", "Service updated successfully.");
			router.push("/settings");
		} catch (error) {
			console.error("PATCH error", error);
			Alert.alert("Error", "Failed to update service.");
		}
	};

	return (
		<SafeAreaView style={[styles.page, { backgroundColor: colors.bgPage }]}>
			<View style={styles.header}>
				<TouchableOpacity style={{ padding: 4 }} onPress={() => router.back()}>
					{mode === "light" ? <IconArrowLeft /> : <IconArrowLeftDark />}
				</TouchableOpacity>
				<Text style={[styles.headerTitle, { color: colors.text }]}>
					{" "}
					{data?.service?.name}{" "}
				</Text>
			</View>
			<ScrollView contentContainerStyle={styles.box}>
				<View style={styles.inputSection}>
					<View style={styles.inputSectionTitle}>
						<Text style={styles.inputSectionTitleText}>
							{t("serviceName")}_{currentLocale}
						</Text>
					</View>
					<TextInput
						style={[
							styles.inputSectionInput,
							{ borderColor: colors.text, color: colors.text }
						]}
						onChangeText={setServiceName}
						value={serviceName}
					/>
				</View>

				<View style={styles.inputSection}>
					<View style={styles.inputSectionTitle}>
						<Text style={styles.inputSectionTitleText}>
							{t("images")} {data?.service.images.length}
						</Text>
					</View>
					<View style={styles.imagesRow}>
						{data?.service.images.map(item => (
							<View key={item.id} style={styles.imagesItem}>
								<View style={styles.imageItemActions}>
									<TouchableOpacity
										onPress={() => handleDeleteImage(String(item.id))}
										style={styles.imageItemDelete}
									>
										<IconCrash />
									</TouchableOpacity>
								</View>
								<Image
									key={item.id}
									source={{ uri: item.url }}
									style={styles.imagesItem}
								/>
							</View>
						))}
						<TouchableOpacity
							onPress={pickImage}
							style={[styles.imagesItemUpload, { borderColor: colors.text }]}
						>
							<IconImageUpload />
							<Text
								style={[styles.imagesItemUploadText, { color: colors.text }]}
							>
								{t("addImage")}
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.inputSection}>
					<View style={styles.inputSectionTitle}>
						<Text style={styles.inputSectionTitleText}>
							{t("description")}_{currentLocale}
						</Text>
					</View>
					<TextInput
						style={[
							styles.inputSectionInput,
							{ borderColor: colors.text, color: colors.text }
						]}
						onChangeText={setDescription}
						value={description}
					/>
				</View>

				<View style={styles.inputSection}>
					<View style={styles.inputSectionTitle}>
						<Text style={styles.inputSectionTitleText}>
							{t("evaluation")}_{currentLocale}
						</Text>
					</View>
					<TextInput
						style={[
							styles.inputSectionInput,
							{ borderColor: colors.text, color: colors.text }
						]}
						onChangeText={setPricing}
						value={pricing}
					/>
				</View>

				<View style={styles.inputSection}>
					<View style={styles.inputSectionTitle}>
						<Text style={styles.inputSectionTitleText}>
							{t("booking")}_{currentLocale}
						</Text>
					</View>
					<TextInput
						style={[
							styles.inputSectionInput,
							{ borderColor: colors.text, color: colors.text }
						]}
						onChangeText={setBooking}
						value={booking}
					/>
				</View>
				<View
					style={[
						styles.buttonSaveWrapper,
						{ borderColor: colors.bgServiceBorder }
					]}
				>
					<TouchableOpacity
						style={[
							styles.buttonSave,
							{
								backgroundColor: colors.text
							}
						]}
						onPress={putService}
					>
						<Text
							style={[styles.buttonSaveText, { color: colors.textReverse }]}
						>
							{t("save")}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	page: { flex: 1 },
	box: { paddingVertical: 18, paddingHorizontal: 24, paddingBottom: 90 },
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		paddingBottom: 14,
		paddingHorizontal: 24,
		paddingTop: 20
	},
	headerTitle: { fontFamily: "Lexend-Regular", fontSize: 16 },
	text: { fontSize: 16, fontFamily: "Lexend-Regular", marginTop: 20 },
	inputSection: { marginBottom: 14, flexDirection: "column", width: "100%" },
	inputSectionTitle: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		backgroundColor: Colors.dark.primary,
		borderRadius: 4,
		flexDirection: "row",
		alignSelf: "flex-start",
		marginBottom: 14
	},
	inputSectionTitleText: {
		fontSize: 14,
		fontFamily: "Lexend-Regular",
		color: Colors.light.text
	},
	inputSectionInput: {
		borderWidth: 1,
		borderRadius: 4,
		fontSize: 14,
		fontFamily: "Lexend-Light",
		paddingVertical: 7.5,
		paddingHorizontal: 6
	},
	imagesRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		rowGap: 12,
		columnGap: 12
	},
	imagesItem: {
		height: 100,
		aspectRatio: 1,
		borderRadius: 10,
		position: "relative"
	},
	imageItemActions: {
		position: "absolute",
		right: 0,
		top: 0,
		borderTopLeftRadius: 6,
		borderBottomLeftRadius: 6,
		backgroundColor: " #FFFFFF1A",
		zIndex: 10
	},
	imageItemDelete: {
		width: 25,
		height: 11,
		borderRadius: 2,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FF2D55"
	},
	imagesItemUpload: {
		width: "30%",
		height: 100,
		aspectRatio: 1,
		borderRadius: 10,
		borderWidth: 1,
		borderStyle: "dashed",
		alignItems: "center",
		justifyContent: "center"
	},
	imagesItemUploadText: {
		fontSize: 12,
		fontFamily: "Lexend-Regular",
		textDecorationLine: "underline",
		marginTop: 12
	},
	buttonSaveWrapper: {
		borderTopWidth: 1,
		marginTop: 14
	},
	buttonSave: {
		padding: 8.5,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 4,
		marginTop: 18
	},
	buttonSaveText: { fontSize: 16, fontFamily: "Lexend-Regular" }
});
