import {
	getAccessToken,
	removeFromStorage,
	removeIsServiceProvider,
	saveTokenStorage,
	setIsServiceProvider
} from "@/shared/api/services/auth-token.service";
import { authService } from "@/shared/api/services/auth.service";
import { Verify } from "@/shared/api/types";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { InteractionManager } from "react-native";

type AuthContextType = {
	isLoggedIn: boolean;
	login: (data: Verify) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			const token = await getAccessToken();
			if (token) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		};
		checkAuth();
	}, []);

	const login = async (data: Verify) => {
		try {
			const response = await authService.accountVerify(data);
			if (response.data.access_token) {
				await saveTokenStorage(response.data.access_token);
				await setIsServiceProvider(response.data.is_service_provider);
				setIsLoggedIn(true);
				router.push("/home");
			} else {
				router.replace("/login");
			}
		} catch (e) {
			console.error("Login error:", e);
		}
	};

	const logout = () => {
		setIsLoggedIn(false);
		removeFromStorage();
		removeIsServiceProvider();
		InteractionManager.runAfterInteractions(() => {
			router.replace("/login");
		});
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
