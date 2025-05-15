import { axiosWithAuth } from "../interceptors";
import {
	CategoriesWithChildrenArgs,
	CategoriesWithChildrenData
} from "../types";

class CategoriesService {
	async getCategories(params: CategoriesWithChildrenArgs) {
		const response = await axiosWithAuth.get<CategoriesWithChildrenData>(
			"/categories",
			{ params }
		);
		return response.data.data;
	}
}

export const categoriesService = new CategoriesService();
