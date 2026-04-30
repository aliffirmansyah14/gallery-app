import { useImperativeHandle, useState } from "react";

export type LoginErrorBannerHandle = {
	display: (message: string) => void;
	clear: () => void;
};

interface LoginErrorBannerProps {
	ref: React.RefObject<LoginErrorBannerHandle | null>;
}

const LoginErrorBanner = ({ ref }: LoginErrorBannerProps) => {
	const [message, setMessage] = useState<string>("");

	useImperativeHandle(ref, () => ({
		display: (msg: string) => setMessage(msg),
		clear: () => setMessage(""),
	}));

	if (!message) return null;

	return (
		<div className="bg-destructive/20 rounded p-2 animate-in fade-in duration-300">
			<p className="text-red-500 text-sm font-medium">{message}</p>
		</div>
	);
};

export default LoginErrorBanner;
