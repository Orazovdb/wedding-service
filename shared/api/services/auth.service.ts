import { axiosWithFile } from "../../api/interceptors";
import type {
	Auth,
	AuthResponse,
	Verify,
	VerifyUserResponse
} from "../types";

class AuthService {
	async accountVerify(data: Verify) {
		const response = await axiosWithFile.post<VerifyUserResponse>(
			`/verify`,
			data
		);
		return response.data;
	}

	async login(data: Auth) {
		const response = await axiosWithFile.post<AuthResponse>(`/login`, data);
		return response.data;
	}
}

export const authService = new AuthService();
