import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';

export const verifyLoginRoute: FastifyPluginCallbackZod = (app) => {
    app.post('/user/login',{
          schema: {
            body: z.object({
              name: z.string().min(1),
              password: z.string().min(4),
            }),
          },
        },
        async (request, reply)=>{
            const {name, password} = request.body;

            const results = await db.
            select({
                id: schema.user.id,
                name: schema.user.name,
                password: schema.user.password,
            }).
            from(schema.user).
            where(eq(schema.user.name, name)).
            limit(1);
            
            const resultUser = results[0];

            if (!resultUser) {
                throw new Error('Failed to find user');
            }

            const isMatch = await bcrypt.compare(password, resultUser.password);

            if (!isMatch) {
                throw new Error('Wrong password');
            }

            return reply.status(200).send({ userId: resultUser.id }) // change to add JWT
    })
}