import FormLogin from "@/features/auth/components/FormLogin";

const LoginPage = () => {
	return (
		<div className="w-full flex justify-center items-center mt-14">
			<div className="max-w-sm w-full">
				<FormLogin />
			</div>
		</div>
	);
};

export default LoginPage;
