export type Register = {
	name: string;
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

export type Login = {
	phone: string;
};

export type AuthResponse = {
	success: string;
};
