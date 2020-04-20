import { Resolver, Query, Mutation, Arg, Authorized, UseMiddleware } from "type-graphql";
import bcrypt from 'bcryptjs';
import { User } from "src/entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middlewares/isAuth";
import { logger } from "../middlewares/logger";
import { createConfirmationURL } from "../utils/createConfirmationURL";
import { sendEmail } from "../utils/sendEmail";

@Resolver(User)
export class RegisterResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => String)
    async hello() {
        return "Hello World!";
    }

    @Mutation(() => User)
    async register(
        @Arg('data') {
            firstName,
            lastName,
            email,
            password
        }: RegisterInput,
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();

        await sendEmail(email, await createConfirmationURL(user.id));

        return user;
    }
}