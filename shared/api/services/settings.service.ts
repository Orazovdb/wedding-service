import { axiosWithAuth, axiosWithFile } from "../interceptors";
import { ProvidedServices, Settings } from "../types";

class SettingsService {
	getContacts = async ({ params }: { params: { lang: string } }) => {
		const response = await axiosWithAuth.get<Settings>("/settings/contact_us", {
			params
		});
		return response.data;
	};

	getAdService = async ({ params }: { params: { lang: string } }) => {
		const response = await axiosWithAuth.get<Settings>(
			"/settings/provide_service",
			{
				params
			}
		);
		return response.data;
	};

	getProvidedServices = async ({ params }: { params: { lang: string } }) => {
		const response = await axiosWithAuth.get<ProvidedServices>(
			"/providing-services",
			{ params }
		);
		return response.data;
	};
	patchProvidedServices = async (id: string, data: any) => {
		const response = await axiosWithFile.post(`/services/${id}/update`, data);
		return response.data;
	};
}

export const settingsService = new SettingsService();
