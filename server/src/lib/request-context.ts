import { AsyncLocalStorage } from "node:async_hooks";

/**
 * Shape of the per-request context stored using AsyncLocalStorage.
 * Currently only contains the authenticated user's id, but the shape
 * can be extended later for trace ids, correlation ids, etc.
 */
export type RequestContext = {
  userId: string;
};

/**
 * AsyncLocalStorage instance that holds request-scoped data.
 * Resolvers call `getRequestContext()` to read the authenticated user id.
 */
export const requestContext = new AsyncLocalStorage<RequestContext>();

/**
 * Retrieve the current RequestContext from AsyncLocalStorage.
 * Throws when called outside of a request (no context was set).
 */
export const getRequestContext = () => {
  const ctx = requestContext.getStore();
  if (!ctx) {
    throw new Error("No request context available");
  }
  return ctx;
};
