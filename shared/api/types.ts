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
	data: CategoriesWithChildren[]
}
