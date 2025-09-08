CREATE EXTENSION IF NOT EXISTS vector;

-- AlterTable
ALTER TABLE "public"."UserNote" ADD COLUMN     "vector" vector(1536);
