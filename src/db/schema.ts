import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const momentum = pgTable("momentum", {
  id: integer("id").primaryKey(),
  goal: text("goal").notNull(),
  done: boolean("done").default(false).notNull(),
});