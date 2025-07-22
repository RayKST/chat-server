import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";


export const user = pgTable('user', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    description: text(),
    password: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
})