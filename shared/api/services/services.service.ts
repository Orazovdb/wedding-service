import { axiosClassic, axiosWithAuth } from "../interceptors";
import {
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
}

export const servicesService = new ServicesService();
