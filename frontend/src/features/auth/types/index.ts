import type { BaseResponse } from "@/lib/api/types";
import type { User } from "@/providers/AuthProvider";

export * from "./login.schema";
export * from "./auth.types";

export interface AuthData extends User {}
export interface AuthDataWithToken {
	user: User;
	token: string;
}
export type AuthResponseWithToken = BaseResponse<AuthDataWithToken>;
export type AuthResponse = BaseResponse<AuthData>;
