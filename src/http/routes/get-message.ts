import { eq } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';


export const getMessageRoute: FastifyPluginCallbackZod = (app) => {
    app.get('/chat/:chatId/message', 
        {
            schema: {
                params: z.object({
                    chatId: z.string(),
                }),
            },
        },

        async (request) => {
            const chatId = request.params.chatId;

            const results = await db.
                select({
                    id: schema.message.id,
                    content: schema.message.content,
                    userId: schema.message.userId,              // later change to return username not the id
                    createAt: schema.message.createdAt,
                }).
                from(schema.message).
                where(eq(schema.message.chatId, chatId)).
                orderBy(schema.message.createdAt);

            return results;
        },
    )
}