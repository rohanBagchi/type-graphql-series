import { MiddlewareFn } from "type-graphql";
import { MyContext } from "src/types/Mycontext";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    if (!context.req.session!.userId) {
        throw new Error('not authenticated');
    }
    return next();
};