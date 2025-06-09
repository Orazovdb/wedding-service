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

	uploadImage = async (id: string, data: FormData) => {
		const response = await axiosWithFile.post(
			`/services/${id}/images/store`,
			data
		);
		return response.data;
	};

	deleteImage = async (id: string, imageId: string) => {
		const response = await axiosWithAuth.delete(
			`/services/${id}/images/${imageId}/delete`
		);
		return response.data;
	};
}

export const profileService = new ProfileService();
