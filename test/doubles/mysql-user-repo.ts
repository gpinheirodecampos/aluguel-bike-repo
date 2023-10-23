import { UserRepo } from "../../src/ports/user-repo"
import { User } from "@prisma/client"
import prisma from "../../src/prisma"

export class MySqlUserRepo implements UserRepo {
	async create(user: User): Promise<number> {
		const newUser = await prisma.user.create({ data: user })
		await prisma.$transaction
		return newUser.id
	}

	async find(email: string): Promise<User> {
		return await prisma.user.findUnique({ where: { email: email } })
	}

	async delete(email: string): Promise<Boolean> {
		const deleted = await prisma.user.delete({ where: { email: email } })
		if (deleted) return true
		else return false
	}

	async list(): Promise<User[]> {
		return await prisma.user.findMany()
	}
}
