import { v4 } from 'uuid';
import { redis } from 'src/redis';

export const createConfirmationURL = async (userId: number) => {
    const token = v4();

    await redis.set(token, userId, 'ex', 60 * 60 * 24); // 1 day

    return `http://localhost:3000/user/confirm/${token}`;
}