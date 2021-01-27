import {CallbackDriver} from "./CallbackDriver";
import * as express from "express";

const app: express.Application = express();

const PORT: number = 8080;

app.get("/", (req: express.Request, res: express.Response) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
});
const test = new CallbackDriver();
