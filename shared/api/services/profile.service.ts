import { axiosWithAuth } from "../interceptors";
import { Profile } from "../types";

class ProfileService {
	getProfile = async () => {
		const response = await axiosWithAuth.get<Profile>("/profile");
		return response.data;
	};
}

export const profileService = new ProfileService()