import { axiosWithAuth } from "@/shared/api/interceptors";
import { Home } from "./types";

class HomeService {
	async getHome() {
		const response = await axiosWithAuth.get<Home>(`/home`);
		return response.data;
	}
}

export const homeService = new HomeService();
