import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import Express from "express"
import { buildSchema } from "type-graphql"
import { createConnection } from 'typeorm'
import { RegisterResolver } from './modules/user/Register'
import { LoginResolver } from './modules/user/Login'
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from "./redis"
import cors from 'cors';
import { MeResolver } from "./modules/user/Me"
import { ConfirmUserResolver } from "./modules/user/ConfirmUser"

const RedisStore = connectRedis(session);

const main = async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver, MeResolver, ConfirmUserResolver],
        authChecker: ({ context: { req } }) => {
            // here we can read the user from context
            // and check his permission in the db against the `roles` argument
            // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
            return !!req.session.userId; // or false if access is denied
        }
    });
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }) => ({ req })
    });

    const sessionOption: session.SessionOptions = {
        store: new RedisStore({
            client: redis as any,
        }),
        name: "qid",
        secret: "session secret 12",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        },
    };

    const app = Express();

    app.use(session(sessionOption));
    app.use(cors({
        credentials: true,
        origin: 'http://localhost:3000'
    }));

    apolloServer.applyMiddleware({ app });

    app
        .listen(
            4000,
            () => {
                console.log('server started on http://localhost:4000');
            }
        );
};

main();