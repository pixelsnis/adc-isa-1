import { AsyncLocalStorage } from "node:async_hooks";

export type RequestContext = {
  userId: string;
};

export const requestContext = new AsyncLocalStorage<RequestContext>();

export const getRequestContext = () => {
  const ctx = requestContext.getStore();
  if (!ctx) {
    throw new Error("No request context available");
  }
  return ctx;
};
