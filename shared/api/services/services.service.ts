import { axiosClassic } from "../interceptors";
import { HumanServicesArgs, HumanServicesData } from "../types";

class ServicesService {
	async getServices(params: HumanServicesArgs) {
		const response = await axiosClassic.get<HumanServicesData>("/services", {
			params
		});
		console.log("response", response.data.data.length);
		console.log("params", params);
		return response.data;
	}
}

export const servicesService = new ServicesService();
