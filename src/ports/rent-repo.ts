import { Rent } from "@prisma/client"
import { User } from "@prisma/client"
import { Bike } from "@prisma/client"

export interface RentRepo {
    create(bike: Bike, user: User): Promise<number>
    findOpen(bikeId: number, userEmail: string): Promise<Rent>
    findOpenFor(userEmail: string): Promise<Boolean>
    update(id: number, rent: Rent): Promise<void>
}