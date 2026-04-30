import axios from "axios";

export interface CleanError {
	status: number | null;
	message: string;
	type: "SERVER_ERROR" | "NETWORK_ERROR" | "UNKNOWN_ERROR";
}

export const getCleanErrorMessage = (error: unknown): CleanError => {
	// 1. Cek apakah ini error dari Axios
	if (axios.isAxiosError(error)) {
		if (error.response) {
			// Server merespon dengan status di luar 2xx (Misal: 400, 401, 500)
			return {
				status: error.response.status,
				message:
					error.response.data?.message || "Terjadi kesalahan pada server.",
				type: "SERVER_ERROR",
			};
		}

		if (error.request) {
			// Request dikirim tapi tidak ada respon (Misal: Internet mati)
			return {
				status: null,
				message:
					"Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
				type: "NETWORK_ERROR",
			};
		}

		// Error saat setup request atau pembatalan request
		console.log({ error });
		return {
			status: null,
			message: error.message,
			type: "UNKNOWN_ERROR",
		};
	}

	// 2. Jika error biasa (bukan Axios)
	return {
		status: null,
		message:
			error instanceof Error ? error.message : "Terjadi kesalahan diserver.",
		type: "UNKNOWN_ERROR",
	};
};
