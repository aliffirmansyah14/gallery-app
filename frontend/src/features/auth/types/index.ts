import type { BaseResponse } from "@/lib/api/types";
import type { User } from "@/providers/AuthProvider";

export * from "./login.schema";
export * from "./auth.types";

export interface AuthData extends User {}

export type AuthResponseWithToken = BaseResponse<{
	user: AuthData;
	token: string;
}>;
export type AuthResponse = BaseResponse<AuthData>;
