import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:5000",
});

api.interceptors.request.use(config => {
	const token = localStorage.getItem("token");
	if (token) {
		const parsedToken = JSON.parse(token);
		config.headers.Authorization = `Bearer ${parsedToken}`;
	}
	return config;
});
