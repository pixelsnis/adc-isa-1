import express from "express";
import * as bodyParser from "body-parser";
import { createExpressEndpoints } from "@ts-rest/express";
import Contract from "@waffles/contract";
import ContractResolver from "src/resolvers";
import { validateAuth } from "src/lib/jwt-verify";
import { requestContext, type RequestContext } from "src/lib/request-context";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/**
 * Authentication middleware applied to every route.
 * - Validates the incoming Authorization header using `validateAuth`.
 * - If valid, it creates a request context containing `userId` and
 *   runs the rest of the request inside that async context so resolvers
 *   can access the current user via `requestContext`.
 */
app.use(async (req, res, next) => {
  // Ignore for /account/exists which is public
  if (req.path === "/account/exists") {
    return next();
  }

  const user = await validateAuth(req);

  // If token validation failed or the token has no subject, reject the request
  if (!user?.sub) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const context: RequestContext = {
    // Supabase stores the user id in `sub` on the JWT payload
    userId: user.sub as string,
  };

  // Run the remainder of the request inside the AsyncLocalStorage context
  requestContext.run(context, () => {
    next();
  });
});

// Wire up the ts-rest endpoints from the contract and resolver map
createExpressEndpoints(Contract, ContractResolver, app);

// Start the server - NOTE: this needs to be changed for production
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
