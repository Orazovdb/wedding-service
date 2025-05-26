import { axiosWithAuth } from "@/shared/api/interceptors";
import {
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

	async getServicesById(id: string) {
		const response = await axiosWithAuth.get<HumanServicesByIdData | undefined>(
			`/services/${id}`
		);
		return response.data;
	}

	async toggleFollowService(data: { service_id: number }) {
		const response = await axiosWithAuth.post("/toggle/following", data);
		return response.data;
	}

	async getFollowers() {
		const response  = await axiosWithAuth.get<FollowersData>('/followings')
		return response.data
	}
}

export const servicesService = new ServicesService();
