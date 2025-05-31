import { axiosWithAuth } from "@/shared/api/interceptors";
import {
	FollowersArgs,
	FollowersData,
	HumanServicesArgs,
	HumanServicesByIdData,
	HumanServicesData
} from "../types";

class ServicesService {
	async getServices(params: HumanServicesArgs) {
		const response = await axiosWithAuth.get<HumanServicesData>("/services", {
			params
		});
		return response.data;
	}

	async getServicesById(id: string, lang: string) {
		const response = await axiosWithAuth.get<HumanServicesByIdData | undefined>(
			`/services/${id}?lang=${lang}`
		);
		return response.data;
	}

	async toggleFollowService(data: { service_id: number }) {
		const response = await axiosWithAuth.post(`/toggle/following`, data);
		return response.data;
	}

	async getFollowers(params: FollowersArgs){
		const response = await axiosWithAuth.get<FollowersData>("/followings", {
			params
		});
		return response.data;
	}
}

export const servicesService = new ServicesService();
