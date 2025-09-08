import { s, prisma } from "@/init";
import { NotesContract } from "@waffles/contract";
import { getRequestContext } from "../lib/request-context";
import VectorStore from "src/lib/vector";

/**
 * Resolver for notes endpoints. Supports adding a note (which persists to the
 * database and also adds the content to the memory graph) and listing notes.
 */
const NotesResolver = s.router(NotesContract, {
  /**
   * POST /notes - create a new note for the authenticated user
   * - Persists to the `userNote` table and also adds the note to the
   *   memory service so the AI can search it later.
   */
  add: async (ctx) => {
    const { userId } = getRequestContext();
    const { content } = ctx.body;

    // Persist note in the relational database
    const newNote = await prisma.userNote.create({
      data: {
        content,
        userId,
      },
    });

    console.info(`Created new note with ID ${newNote.id}`);

    // Also add the raw content to vector store
    await VectorStore.addModels([newNote]);
    console.info(`Added note ID ${newNote.id} to vector store`);

    return {
      status: 200,
      body: newNote,
    };
  },

  /**
   * GET /notes - list notes for the authenticated user, ordered by creation time
   */
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
