import { s, prisma } from "@/init";
import { NotesContract } from "@waffles/contract";
import { getRequestContext } from "../lib/request-context";
import { memory } from "src/lib/memory";

const NotesResolver = s.router(NotesContract, {
  add: async (ctx) => {
    const { userId } = getRequestContext();
    const { content } = ctx.body;

    const newNote = await prisma.userNote.create({
      data: {
        content,
        userId,
      },
    });

    await memory.add(content, { userId });

    return {
      status: 200,
      body: newNote,
    };
  },
  list: async () => {
    const { userId } = getRequestContext();

    const notes = await prisma.userNote.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    return {
      status: 200,
      body: notes,
    };
  },
});

export default NotesResolver;
