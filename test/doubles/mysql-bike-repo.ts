import { Bike } from "../../src/bike";
import { BikeRepo } from "../../src/ports/bike-repo";
import prisma from '../../src/prisma'

export class MySqlBikeRepo implements BikeRepo {
    async find(id: number): Promise<Boolean> {
        const bike = await prisma.bike.findUnique({ where: { id: id } })
        
        if (bike) return true

        return false
    }

    async insert(bike: Bike): Promise<Boolean> {
        const newBike = await prisma.bike.create({ data: {
            name: bike.name,
            type: bike.type,
            bodySize: bike.bodySize,
            maxLoad: bike.maxLoad,
            rate: bike.rate,
            description: bike.description,
            ratings: bike.ratings,
            avaible: bike.available,
            latitude: bike.latitude,
            longitude: bike.longitude
        } })
        
        if (newBike) return true
        
        return false
    }

    async remove(id: number): Promise<Boolean> {
        const removed = await prisma.bike.delete({ where: {id: id} })
        if (removed) return true
        return false
    }

    async list(): Promise<void> {
        await prisma.bike.findMany()
    }

    async update(id: number, bike: Bike): Promise<Boolean> {
        const updated = await prisma.bike.update({ where: {id: id}, data: bike })
        if (updated) return true
        return false
    }
}