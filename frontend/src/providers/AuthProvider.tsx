import { getUser } from "@/features/auth/services/auth.services";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useEffect, useState } from "react";

export type User = {
	id: string;
	email: string;
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

	useEffect(() => {
		const fetchUser = async () => {
			setIsLoading(true);
			try {
				const response = await getUser();
				console.log(response);
				if (response.success) {
					setUser(response.data?.user);
					setToken(response.data?.token || "");
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchUser();
	}, []);
	return (
		<AuthContext
			value={{
				user,
				setUser,
				setToken,
				loading: isLoading,
			}}
		>
			{children}
		</AuthContext>
	);
};

export default AuthProvider;
