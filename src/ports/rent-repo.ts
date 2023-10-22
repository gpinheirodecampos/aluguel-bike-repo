import { Rent } from "@prisma/client"

export interface RentRepo {
    create(rent: Rent): Promise<Rent>
    findOpen(bikeId: number, userEmail: string): Promise<number>
    findOpenFor(userEmail: string): Promise<Boolean>
    update(id: number, rent: Rent): Promise<void>
}