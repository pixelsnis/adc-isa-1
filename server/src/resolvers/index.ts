import { s } from "@/init";
import Contract from "@waffles/contract";
import AIResolvers from "./ai";
import AccountResolvers from "./account";
import NotesResolver from "./notes";

// Root resolver map that wires each contract area (ai, account, notes)
// to its corresponding resolver implementation.
const ContractResolver = s.router(Contract, {
  ai: AIResolvers,
  account: AccountResolvers,
  notes: NotesResolver,
});

export default ContractResolver;
