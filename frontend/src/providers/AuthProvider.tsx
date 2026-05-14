import type { LoginFormData } from "@/features/auth/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";
import {
	useCallback,
	useEffect,
	useEffectEvent,
	useMemo,
	useRef,
	useState,
	useTransition,
} from "react";
import * as authService from "@/features/auth/services";
import { AuthContext } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
	const [loading, setLoading] = useState<boolean>(true);
	const [, setToken] = useLocalStorage("token", "");
	const [, startTransition] = useTransition();
	const abortControllerRef = useRef<AbortController | null>(null);
	const navigate = useNavigate();

	const createSignal = () => {
		abortControllerRef.current?.abort();
		abortControllerRef.current = new AbortController();
		return abortControllerRef.current.signal;
	};

	const fetchUser = useEffectEvent(async () => {
		const signal = createSignal();
		setLoading(true);

		try {
			await new Promise(res => setTimeout(res, 1000));
			const response = await authService.getMe(signal);

			setUser(response.data ?? null);
		} catch (error: unknown) {
			if (
				error instanceof Error &&
				(error.name === "CanceledError" || error.name === "AbortError")
			)
				return;

			const err = getCleanErrorMessage(error);
			console.error("Auth fetch error:", err.message);

			setUser(null);
		} finally {
			if (!signal.aborted) {
				setLoading(false);
			}
		}
	});

	useEffect(() => {
		fetchUser();

		return () => {
			abortControllerRef.current?.abort();
		};
	}, []);

	const handleLogin = useCallback(
		async (data: LoginFormData): Promise<void> => {
			const signal = createSignal();

			try {
				const response = await authService.login(data, signal);

				console.log(response.data?.token);
				setToken(response.data?.token || "");
				setUser(response.data?.user ?? null);

				if (response.success && response.data) {
					startTransition(() => {
						navigate("/");
					});
				}
			} catch (error: unknown) {
				if (
					error instanceof Error &&
					(error.name === "CanceledError" || error.name === "AbortError")
				) {
					return;
				}

				const err = getCleanErrorMessage(error);
				console.log("Error saat login : ", err);
				throw err;
			}
		},
		[navigate, setToken],
	);

	const contextValue = useMemo(
		() => ({
			user,
			setUser,
			setToken,
			loading,
			handleLogin,
		}),
		[user, loading, handleLogin],
	);

	return <AuthContext value={contextValue}>{children}</AuthContext>;
}
