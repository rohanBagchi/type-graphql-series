import { MiddlewareFn } from "type-graphql";
import { MyContext } from "src/types/Mycontext";

export const logger: MiddlewareFn<MyContext> = async ({ args }, next) => {
    console.log("LOGGER:: ", args)
    return next();
};