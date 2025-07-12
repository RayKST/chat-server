import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';


export const getUserRoute: FastifyPluginCallbackZod = (app) => {
    app.get('/user', async ()=>{
        const results = await db.
        select({
            id: schema.user.id,
            name: schema.user.name,
            createAt: schema.user.createdAt,
        }).
        from(schema.user).
        orderBy(schema.user.createdAt);

        return results;
    })
}