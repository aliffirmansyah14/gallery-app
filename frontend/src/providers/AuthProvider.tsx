import type { LoginFormData } from "@/features/auth/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";
import { createContext, useEffect, useRef, useState } from "react";
import * as authService from "@/features/auth/services/auth.services";

export type User = {
	id: string;
	email: string;
	name: string;
};

type AuthContextTypes = {
	user: User | undefined;
	setUser: (value: User | undefined) => void;
	setToken: (value: string) => void;
	abortControllerRef: React.RefObject<AbortController | undefined>;
	loading: boolean;
	handleLogin: (data: LoginFormData) => Promise<void>;
};

export const AuthContext = createContext<AuthContextTypes | undefined>(
	undefined,
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [_, setToken] = useLocalStorage("token", "");
	const abortControllerRef = useRef<AbortController | undefined>(undefined);

	const fetchUser = async (controller: AbortController) => {
		setIsLoading(true);
		try {
			const response = await authService.getUser(controller);
			if (response.success) {
				setUser(response.data);
			}
		} catch (error: any) {
			if (error.name === "AbortError") return;

			// const err = getCleanErrorMessage(error);
			// console.error("Auth fetch error:", err.message);
			setUser(undefined);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		abortControllerRef.current = new AbortController();
		fetchUser(abortControllerRef.current);
		return () => {
			abortControllerRef.current?.abort();
		};
	}, []);

	const handleLogin = async (data: LoginFormData) => {
		abortControllerRef.current?.abort();
		abortControllerRef.current = new AbortController();
		try {
			const res = await authService.login(data, abortControllerRef.current);
			console.log(res.data);
			setToken(res.data?.token || "");
			setUser(res.data?.user);
		} catch (error) {
			throw getCleanErrorMessage(error);
		}
	};

	const contextValue = {
		user,
		setUser,
		setToken,
		abortControllerRef,
		loading: isLoading,
		handleLogin,
	};
	return <AuthContext value={contextValue}>{children}</AuthContext>;
};

export default AuthProvider;
