import { axiosClassic } from "../interceptors";
import {
	HumanServicesArgs,
	HumanServicesByIdData,
	HumanServicesData
} from "../types";

class ServicesService {
	async getServices(params: HumanServicesArgs) {
		const response = await axiosClassic.get<HumanServicesData>("/services", {
			params
		});
		console.log(response.data.data, "responseeeee:");
		console.log(params, "paramsss:");
		return response.data;
	}

	async getServicesById(id: string) {
		const response = await axiosClassic.get<HumanServicesByIdData | undefined>(
			`/services/${id}`
		);
		return response.data;
	}
}

export const servicesService = new ServicesService();
