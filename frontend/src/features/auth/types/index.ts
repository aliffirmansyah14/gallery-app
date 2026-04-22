import type { BaseResponse } from "@/lib/api/types";
import type { User } from "@/providers/AuthProvider";

export * from "./login.schema";
export * from "./auth.types";

export interface AuthData {
	token: string;
	user: User;
}

export type AuthResponse = BaseResponse<AuthData>;
