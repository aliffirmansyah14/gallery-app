import express from "express";
import cors, { type CorsOptions } from "cors";
import userRouter from "../routers/auth.router";
import fileRouter from "../routers/file.router";

const PORT = process.env.PORT || 3000;

const server = express();

const corsOptions: CorsOptions = {
	origin: [`http://localhost:${PORT}`],
};

server.use(cors(corsOptions));
server.use(express.json());

server.use(userRouter);
server.use(fileRouter);

server.get("/", (_, res) => {
	res.send("api buat gallery");
});

export { server, PORT };
