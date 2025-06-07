export type Auth = {
	phone: string;
};

export type Verify = {
	phone: string;
	otp: string;
};

export type VerifyUserResponse = {
	data: {
		id: number;
		name: string;
		phone: string;
		access_token: string;
		is_service_provider: boolean;
	};
};

export type AuthResponse = {
	success: string;
};

export enum statusServices {
	NORMAL = "normal",
	GOLDEN = "golden",
	PREMIUM = "premium",
	NEW = "new"
}

export type Services = {
	id: number;
	name: string;
	status: statusServices;
	logo: string;
	followers_count: number;
	is_followed: boolean;
	region: {
		id: number;
		name: string;
		province: string;
	};
	service_provider: {
		id: number;
		name: string;
	};
};

export type Categories = {
	id: number;
	name: string;
	services: Services[];
};

export enum parentCategories {
	WITHOUT_PARENT,
	WITH_PARENT
}

export type CategoriesWithChildrenArgs = {
	parent?: parentCategories;
	category_id?: string;
	lang: string;
};

export type CategoriesWithChildren = {
	id: number;
	name: string;
	icon: string;
	children: CategoriesWithChildren[];
};

export type CategoriesWithChildrenData = {
	data: CategoriesWithChildren[];
};

export type HumanServicesArgs = {
	category_ids: string | undefined;
	subcategory_ids?: string | undefined;
	name: string | undefined;
	provinces: string | undefined;
	statuses: statusServices | string | undefined;
	page: number | undefined;
	limit?: number;
	lang: string;
};

export type HumanServices = {
	id: number;
	name: string;
	status: statusServices;
	followers_count: number;
	logo: string;
	is_followed: boolean;
	categories: [
		{
			id: number;
			name: string;
			icon: string;
		}
	];
	region: {
		id: number;
		name: string;
		province: string;
	};
	service_provider: boolean | null;
};

export type HumanServicesData = {
	data: HumanServices[];
	meta: {
		current_page: number;
		per_page: number;
		total: number;
		limit?: number;
	};
};

export type HumanServicesById = {
	id: number;
	name: string;
	description: string;
	phone: string;
	status: string;
	pricing: string[];
	booking: string[];
	contacts: string[];
	followers_count: number;
	is_followed: boolean;
	categories: {
		id: number;
		name: string;
		icon: string;
		parent_id: number | null;
	}[];
	region: {
		id: number;
		name: string;
		province: string;
	};
	logo: string;
	catalog: string;
	images: {
		id: number;
		url: string;
	}[];
	videos: {
		id: number;
		filename: string;
	}[];
};

export type SimilarServices = {
	id: number;
	name: string;
	status: statusServices;
	logo: string;
	followers_count: string;
	is_followed: boolean;
	categories: [
		{
			id: number;
			name: string;
			parent_id: number | null;
			icon: string;
		}
	];
	region: {
		id: number;
		name: string;
		province: string;
	};
};

export type HumanServicesByIdData = {
	service: HumanServicesById;
	similar: SimilarServices[];
	service_provider: null | boolean;
};

export type FollowersArgs = {
	category_ids: string | undefined;
	provinces: string | undefined;
	statuses: statusServices | string | undefined;
	page: number | undefined;
	limit?: number;
	lang: string;
};

export type Followers = {
	id: number;
	name: string;
	status: statusServices;
	is_followed: boolean;
	logo: string;
	service_provider: null | boolean;
};

export type FollowersData = {
	data: Followers[];
	meta: {
		current_page: number;
		per_page: number;
		total: number;
		limit?: number;
	};
};

export type Profile = {
	data: { id: number; name: string; phone: string };
};

export type ProfileUpdate = {
	name: string;
};

export type Settings = {
	data: {
		keyword: string;
		about_us: string;
		phone: string;
		email: string;
	};
};

export type ProvidedServices = {
	data: [
		{
			id: number;
			name: string;
			status: string;
			is_followed: boolean;
			service_provider: {
				id: number;
				name: string;
			};
		}
	];
};
