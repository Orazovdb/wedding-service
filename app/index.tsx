import { useAuth } from "@/shared/store/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
	const { isLoggedIn } = useAuth();

	return <Redirect href={isLoggedIn ? "/home" : "/login"} />;
}
