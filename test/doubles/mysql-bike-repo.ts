import { Bike } from "@prisma/client"
import { BikeRepo } from "../../src/ports/bike-repo"
import prisma from "../../src/prisma"

export class MySqlBikeRepo implements BikeRepo {
	async find(id: number): Promise<Bike> {
		const bike = await prisma.bike.findUnique({ where: { id: id } })

		return bike
	}

	async create(bike: Bike): Promise<Boolean> {
		const newBike = await prisma.bike.create({ data: bike })

		if (newBike) return true

		return false
	}

	async delete(id: number): Promise<Boolean> {
		const deleted = await prisma.bike.delete({ where: { id: id } })
		if (deleted) return true
		return false
	}

	async list(): Promise<Bike[]> {
		return await prisma.bike.findMany()
	}

	async update(id: number, bike: Bike): Promise<Boolean> {
		const updated = await prisma.bike.update({ where: { id: id }, data: bike })
		if (updated) return true
		return false
	}
}
