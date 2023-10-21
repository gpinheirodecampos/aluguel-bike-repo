import { UserRepo } from "../../src/ports/user-repo";
import { User } from "../../src/user";
import prisma from '../../src/prisma'

export class MySqlUserRepo implements UserRepo {
    async insert(user: User): Promise<number> {
        const newUser = await prisma.user.create({ data: user })
        return newUser.id
    }
    
    async find(email: string): Promise<User> {
        return await prisma.user.findUnique({ where: { email: email } })
    }

    async remove(email: string): Promise<void> {
        await prisma.user.delete({ where: { email: email } })
    }

    async list(): Promise<User[]> {
        return await prisma.user.findMany();
    }
}