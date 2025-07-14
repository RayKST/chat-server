import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';


export const createMessageRoute: FastifyPluginCallbackZod = (app) => {
    app.post('/chat/:chatId/message', 
        {
            schema: {
                params: z.object({
                    chatId: z.string(),
                    
                }),
                body: z.object({
                    userId: z.string(),
                    content: z.string(),
                }),
            },
        },

        async (request, reply) => {
            const chatId = request.params.chatId;
            const {userId, content } = request.body;

            const result = await db
                .insert(schema.message)
                .values({ chatId, content, userId })
                .returning()

            const insertedMessage = result[0]
            if (!insertedMessage) {
                throw new Error('Failed to create new message.');
            }

            return reply.status(201).send({
                messageId: insertedMessage.id,
            });
        },
    )
}