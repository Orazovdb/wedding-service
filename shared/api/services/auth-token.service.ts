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
