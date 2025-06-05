import { axiosWithAuth, axiosWithFile } from "../interceptors";
import { Profile, ProfileUpdate } from "../types";

class ProfileService {
	getProfile = async () => {
		const response = await axiosWithAuth.get<Profile>("/profile");
		return response.data;
	};

	updateProfile = async (data: ProfileUpdate) => {
		const response = await axiosWithFile.post("/profile/update", data);
		return response.data;
	};
}

export const profileService = new ProfileService();
