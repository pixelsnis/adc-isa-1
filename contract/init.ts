import { initContract } from "@ts-rest/core";

// Small wrapper that returns a typed contract builder. Kept as a module so
// definition files can import the same initialized contract helper.
const c = initContract();
export default c;
