import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export enum EnumTokens {
	ACCESS_TOKEN = "accessTokenClient"
}

export const saveTokenStorage = async (accessToken: string): Promise<void> => {
	await SecureStore.setItemAsync(
		EnumTokens.ACCESS_TOKEN,
		`Bearer ${accessToken}`
	);
};

export const getAccessToken = async (): Promise<string | null> => {
	return await SecureStore.getItemAsync(EnumTokens.ACCESS_TOKEN);
};

export const removeFromStorage = async (): Promise<void> => {
	await SecureStore.deleteItemAsync(EnumTokens.ACCESS_TOKEN);
};


export const setIsServiceProvider = async (value: boolean) => {
	await AsyncStorage.setItem("is_service_provider", JSON.stringify(value));
};

export const getIsServiceProvider = async (): Promise<boolean> => {
	const raw = await AsyncStorage.getItem("is_service_provider");
	return raw === "true";
};

export const removeIsServiceProvider = async () => {
  await AsyncStorage.removeItem('is_service_provider');
};