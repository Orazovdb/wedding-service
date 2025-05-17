import { axiosClassic, axiosWithAuth } from "../interceptors";
import { CategoriesWithChildrenData, HumanServices, HumanServicesArgs, HumanServicesData } from "../types";

class ServicesService {
	async getServices(params: HumanServicesArgs) {
		const response = await axiosClassic.get<HumanServicesData>(
			"/services",
			{ params }
		);
		console.log("response", response.data.data);
		return response.data.data;
	}
}

export const servicesService = new ServicesService();
