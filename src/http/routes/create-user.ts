import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const createUserRoute: FastifyPluginCallbackZod = (app) => {
  app.post('/user',
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
          description: z.string().optional(),
        }),
      },
    },
    
    async (request, reply) => {
      const { name, description } = request.body

      const result = await db
        .insert(schema.user)
        .values({
          name,
          description,
        })
        .returning()

      const insertedUser = result[0]

      if (!insertedUser) {
        throw new Error('Failed to create new room.')
      }

      return reply.status(201).send({ userId: insertedUser.id })
    }
  )
}