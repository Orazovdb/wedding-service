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
	parent: parentCategories;
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
	category_id: string | undefined;
	name: string | undefined;
	province: string | undefined;
	status: statusServices | string | undefined;
};

export type HumanServices = {
	id: number;
	name: string;
	status: statusServices;
	followers_count: number;
	logo: string;
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
};
