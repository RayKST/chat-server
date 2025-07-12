import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const chat = pgTable('chat', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    description: text(),
    createdAt: timestamp().defaultNow().notNull()
})