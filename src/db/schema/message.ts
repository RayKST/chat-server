import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { chat } from "./chat.ts";
import { user } from "./user.ts";

export const message = pgTable('message', {
    id: uuid().primaryKey().defaultRandom(),
    content: text(),

    chatId: uuid()
        .references(() => chat.id)
        .notNull(),

    userId: uuid()
        .references(() => user.id)
        .notNull(),

    createdAt: timestamp().defaultNow().notNull()
})