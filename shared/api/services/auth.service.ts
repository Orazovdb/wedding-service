import { axiosWithFile } from "../../api/interceptors";
import type { AuthResponse, Login, Register, Verify, VerifyUserResponse } from "../types";
import { saveTokenStorage } from "./auth-token.service";

 class AuthService  {
	async register(data: Register) {
		const response = await axiosWithFile.post(`/register`, data);
		return response.data;
	}

	async accountVerify(data: Verify) {
		const response = await axiosWithFile.post<VerifyUserResponse>(
			`/verify`,
			data
		);
		if (response.data.data.access_token)
			saveTokenStorage(response.data.data.access_token);
		return response.data;
	}

	async login(data: Login) {
		const response = await axiosWithFile.post<AuthResponse>(`/login`, data);
		return response.data;
	}
};

export const authService = new AuthService()