import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';


export const getChatRoute: FastifyPluginCallbackZod = (app) => {
    app.get('/chat', async ()=>{
        const results = await db.
        select({
            id: schema.chat.id,
            name: schema.chat.name,
            createAt: schema.chat.createdAt,
        }).
        from(schema.chat).
        orderBy(schema.chat.createdAt);

        return results;
    })
}