import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import InputPassword from "./InputPassword";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const FormLogin = () => {
	const { handleLogin } = useAuth();
	const [error, setError] = useState<string>("");
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			await handleLogin(data);
			setError("");
		} catch (error: any) {
			console.error(error);
			setError(error.message || "");
		}
	};
	return (
		<Card className="shadow-md">
			<CardHeader>
				<CardTitle className="text-xl">Login to Gallery App</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>

				{error && (
					<div>
						<p className="text-red-500">{error}</p>
					</div>
				)}
			</CardHeader>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<CardContent className="space-y-2">
					<Controller
						name="email"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Email</FieldLabel>
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									placeholder="m@example.com"
									required
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="password"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Password</FieldLabel>
								<InputPassword field={field} fieldState={fieldState} />
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</CardContent>
				<CardFooter>
					<Button
						type="submit"
						className="w-full py-5 text-lg"
						disabled={form.formState.isSubmitting}
					>
						Login
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
};
export default FormLogin;
