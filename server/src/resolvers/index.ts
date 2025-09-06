import { s } from "@/init";
import Contract from "@waffles/contract";
import AIResolvers from "./ai";
import AccountResolvers from "./account";
import NotesResolver from "./notes";

const ContractResolver = s.router(Contract, {
  ai: AIResolvers,
  account: AccountResolvers,
  notes: NotesResolver,
});

export default ContractResolver;
