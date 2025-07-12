import { reset, seed } from 'drizzle-seed';
import { db, sql } from './connection.ts';
import { schema } from './schema/index.ts';

await reset(db, { schema });
await seed(db, schema).refine((f) => {
  return {
    chat: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    user: {
      count: 5,
      columns: {
        name: f.firstName(),
        description: f.loremIpsum(),
      },
    }
  }
})

await sql.end();


// biome-ignore lint/suspicious/noConsole: <only used in dev>
console.log("DATABASE SEEDED");