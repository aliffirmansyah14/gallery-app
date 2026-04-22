import FormLogin from "@/features/auth/components/FormLogin";

const LoginPage = () => {
	return (
		<div className="w-full flex justify-center items-center mt-14">
			<div className="w-[clamp(var(--container-xs),90vw,var(--container-sm))]">
				<FormLogin />
			</div>
		</div>
	);
};

export default LoginPage;
