import { getUser } from "@/features/auth/services/auth.services";
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

	useEffect(() => {
		const fetchUser = async () => {
			setIsLoading(true);
			try {
				const response = await getUser();
				console.log(response);
				if (response.success) {
					setUser(response.data?.user);
					localStorage.setItem("token", response.data?.token || "");
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchUser();
	}, []);

	const setToken = (value: string) => {
		if (!value) {
			console.log("token tidak ada");
			return;
		}
		localStorage.setItem("token", value);
	};

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
