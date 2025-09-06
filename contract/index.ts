import { AccountContract } from "./definitions/account";
import { AIContract } from "./definitions/ai";
import { NotesContract } from "./definitions/notes";
import c from "./init";

export { AIContract } from "./definitions/ai";
export { AccountContract } from "./definitions/account";
export { NotesContract } from "./definitions/notes";

/**
 * Aggregated contract that maps top-level namespaces to their contracts.
 * This is the single source of truth used by `server` to generate endpoints.
 */
const Contract = c.router({
  ai: AIContract,
  account: AccountContract,
  notes: NotesContract,
});

export default Contract;
