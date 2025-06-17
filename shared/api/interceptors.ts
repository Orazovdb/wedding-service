import { getAccessToken } from "@/shared/api/services/auth-token.service";
import axios, { type CreateAxiosDefaults } from "axios";
import Constants from "expo-constants";

const BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;
const BASE_IMG_URL = "";

const options: CreateAxiosDefaults = {
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json"
	}
};

const optionsFile: CreateAxiosDefaults = {
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "multipart/form-data"
	}
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);
const axiosWithFile = axios.create(optionsFile);

axiosWithAuth.interceptors.request.use(
	async config => {
		const accessToken = await getAccessToken();
		if (config?.headers && accessToken) {
			config.headers.Authorization = accessToken;
		}
		return config;
	},
	error => Promise.reject(error)
);

axiosWithFile.interceptors.request.use(
	async config => {
		const accessToken = await getAccessToken();
		if (config?.headers && accessToken) {
			config.headers.Authorization = accessToken;
		}
		return config;
	},
	error => Promise.reject(error)
);

export {
	axiosClassic,
	axiosWithAuth,
	axiosWithFile,
	BASE_IMG_URL,
	BASE_URL,
	options
};
