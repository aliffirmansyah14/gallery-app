import type { LoginFormData } from "@/features/auth/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";
import {
	useEffect,
	useEffectEvent,
	useRef,
	useState,
	useTransition,
} from "react";
import * as authService from "@/features/auth/services/auth.services";
import { AuthContext } from "@/features/auth/hooks/useAuth";

export type User = {
	id: string;
	email: string;
	name: string;
};

export type AuthContextTypes = {
	user: User | null;
	setUser: (value: User | null) => void;
	setToken: (value: string) => void;
	// abortControllerRef: React.RefObject<AbortController | undefined>;
	loading: boolean;
	handleLogin: (data: LoginFormData) => Promise<void>;
};

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [_, setToken] = useLocalStorage("token", "");
	const [__, startTransition] = useTransition();
	const abortControllerRef = useRef<AbortController | null>(null);

	const fetchUser = useEffectEvent(async (controller: AbortController) => {
		setLoading(true);
		try {
			const response = await authService.getMe(controller.signal);
			if (response.success && response.data) {
				setUser(response.data);
			}
		} catch (error: any) {
			if (error.name === "CanceledError" || error.name === "AbortError") return;

			const err = getCleanErrorMessage(error);
			console.error("Auth fetch error:", err.message);

			setUser(null);
		} finally {
			setLoading(false);
		}
	});

	useEffect(() => {
		abortControllerRef.current?.abort();
		abortControllerRef.current = new AbortController();

		fetchUser(abortControllerRef.current);

		return () => {
			abortControllerRef.current?.abort();
		};
	}, []);

	const handleLogin = async (data: LoginFormData): Promise<void> => {
		abortControllerRef.current?.abort();
		return new Promise((resolve, reject) => {
			startTransition(async () => {
				abortControllerRef.current = new AbortController();
				try {
					const response = await authService.login(
						data,
						abortControllerRef.current.signal,
					);

					console.log(response);
					setToken(response.data?.token || "");
					setUser(response.data?.user || null);

					resolve();
				} catch (error: any) {
					if (error.name === "CanceledError" || error.name === "AbortError")
						return;

					const err = getCleanErrorMessage(error);
					console.log("Error saat login : ", err);

					reject(err);
				}
			});
		});
	};

	const contextValue = {
		user,
		setUser,
		setToken,
		loading,
		handleLogin,
	};
	return <AuthContext value={contextValue}>{children}</AuthContext>;
}
