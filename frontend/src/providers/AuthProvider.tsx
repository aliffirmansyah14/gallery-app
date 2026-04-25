import { getUser } from "@/features/auth/services/auth.services";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";
import { createContext, useEffect, useState } from "react";

export type User = {
	id: string;
	email: string;
	name: string;
};

type AuthContextTypes = {
	user: User | undefined;
	setUser: (value: User | undefined) => void;
	setToken: (value: string) => void;
	loading: boolean;
};

export const AuthContext = createContext<AuthContextTypes | undefined>(
	undefined,
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [_, setToken] = useLocalStorage("token", "");

	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		setIsLoading(true);
	// 		try {
	// 			const response = await getUser();
	// 			if (response.success) {
	// 				console.log(response.data);
	// 				setUser(response.data);
	// 			}
	// 		} catch (error) {
	// 			const err = getCleanErrorMessage(error);
	// 			console.log("Auth fetch error : ", err.message);
	// 			setUser(undefined);
	// 		} finally {
	// 			setIsLoading(false);
	// 		}
	// 	};
	// 	fetchUser();
	// }, []);

	const contextValue = {
		user,
		setUser,
		setToken,
		loading: isLoading,
	};
	return <AuthContext value={contextValue}>{children}</AuthContext>;
};

export default AuthProvider;
