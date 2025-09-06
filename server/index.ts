import * as express from "express";
import * as bodyParser from "body-parser";
import { createExpressEndpoints } from "@ts-rest/express";
import Contract from "@waffles/contract";
import ContractResolver from "src/resolvers";
import { validateAuth } from "src/lib/jwt-verify";
import { requestContext, type RequestContext } from "src/lib/request-context";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("*", async (req, res, next) => {
  const user = await validateAuth(req);
  if (!user?.sub) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const context: RequestContext = {
    userId: user.sub as string,
  };

  requestContext.run(context, () => {
    next();
  });
});

createExpressEndpoints(Contract, ContractResolver, app);

export default app;
