import { RentRepo } from "../../src/ports/rent-repo"
import { Rent } from "@prisma/client"
import prisma from "../../src/prisma"

export class MySqlRentRepo implements RentRepo {
	async create(rent: Rent): Promise<Rent> {
		const newRent = await prisma.rent.create({ data: rent })
		return newRent
	}

	async findOpen(bikeId: number, userEmail: string): Promise<number> {
		const rentsOpen = await prisma.rent.findFirst({
			where: {
				end: undefined,
				bikeId: bikeId,
				users: {
					email: userEmail,
				},
			},
		})

		return rentsOpen.id
	}

	async findOpenFor(userEmail: string): Promise<Boolean> {
		const rents = await prisma.rent.findMany({
			where: {
				users: {
					email: userEmail,
				},
				end: undefined,
			},
		})

		if (rents) return true

		return false
	}

	async update(id: number, rent: Rent): Promise<void> {
		await prisma.rent.update({ where: { id: id }, data: rent })
	}
}
