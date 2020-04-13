import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "src/entity/User";
import { MyContext } from "src/types/Mycontext";

@Resolver(User)
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        const userIdFromSession = ctx.req.session?.userId;

        if (!userIdFromSession) {
            return undefined;
        }

        return User.findOne({
            where: {
                id: userIdFromSession
            }
        });
    }

}