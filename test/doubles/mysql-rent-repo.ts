import { RentRepo } from "../../src/ports/rent-repo";
import { Rent } from "../../src/rent";
import prisma from '../../src/prisma'

export class MySqlRentRepo implements RentRepo {
    async add(rent: Rent): Promise<number> {
        const newRent = await prisma.rent.create({data: {
            end: rent.end,
            start: rent.start,
            bikes: {
                connect: {
                    id: rent.bike.id
                }
            },
            users: {
                connect: {
                    id: rent.user.id
                }
            }
        }})
        return newRent.id
    }

    async findOpen(bikeId: number, userEmail: string): Promise<number> {
        const rentsOpen = await prisma.rent.findFirst({ where: {
            end: undefined,
            bikeId: bikeId,
            users: {
                email: userEmail
            }
        }})

        return rentsOpen.id
    }

    async findOpenFor(userEmail: string): Promise<Boolean> {
        const rents = await prisma.rent.findMany({ where: {
            users: {
                email: userEmail
            },
            end: undefined
        } })

        if(rents)
            return true
        
        return false
    }

    async update(id: number, rent: Rent): Promise<void> {
        await prisma.rent.update({ where: { id: id }, data: rent })
    }
    
}