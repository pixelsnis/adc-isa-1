import * as express from "express";
import * as bodyParser from "body-parser";
import { createExpressEndpoints } from "@ts-rest/express";
import Contract from "@waffles/contract";
import ContractResolver from "resolvers";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

createExpressEndpoints(Contract, ContractResolver, app);

export default app;
