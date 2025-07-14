import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { fastify } from "fastify";
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { createChatRoute } from "./http/routes/create-chat.ts";
import { createMessageRoute } from "./http/routes/create-message.ts";
import { createUserRoute } from "./http/routes/create-user.ts";
import { getChatRoute } from "./http/routes/get-chat.ts";
import { getMessageRoute } from "./http/routes/get-message.ts";
import { getUserRoute } from "./http/routes/get-user.ts";


// App setup
const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: "http://localhost:5173",
});
app.register(fastifyMultipart);
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);


// Route register
app.register(createChatRoute);
app.register(createUserRoute);
app.register(createMessageRoute);
app.register(getChatRoute);
app.register(getUserRoute);
app.register(getMessageRoute);


// Health and start server
app.get("/health", () => {
    return "OK";
});

app.listen({port: env.PORT});