import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
	ControllerFieldState,
	ControllerRenderProps,
} from "react-hook-form";
import type { LoginFormData } from "../types/auth.schema";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

interface InputPasswordProps {
	field: ControllerRenderProps<LoginFormData, "password">;
	fieldState: ControllerFieldState;
}

const InputPassword = ({ field, fieldState }: InputPasswordProps) => {
	const [isPasswordInputVisible, setIsPasswordInputVisible] =
		useState<boolean>(false);
	return (
		<div className="relative overflow-hidden rounded-sm">
			<Input
				{...field}
				id={field.name}
				type={isPasswordInputVisible ? "text" : "password"}
				aria-invalid={fieldState.invalid}
				className="pr-8"
				required
			/>
			<div className="absolute right-0 top-0 bottom-0 flex items-center justify-items-center border-l">
				<Button
					type="button"
					variant={"ghost"}
					size={"icon-sm"}
					className="h-full rounded-none"
					onClick={() => setIsPasswordInputVisible(!isPasswordInputVisible)}
				>
					{isPasswordInputVisible ? <Eye /> : <EyeClosed />}
				</Button>
			</div>
		</div>
	);
};

export default InputPassword;
