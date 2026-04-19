import { PORT, server } from "./config/server.js";
import "dotenv/config";

server.listen(PORT, () => {
	console.log(`server sedang berjalan di : http://localhost:${PORT}`);
});
