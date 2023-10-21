import { Rent } from "../rent";

export interface RentRepo {
    add(rent: Rent): Promise<number>
    findOpen(bikeId: number, userEmail: string): Promise<number>
    findOpenFor(userEmail: string): Promise<Boolean>
    update(id: number, rent: Rent): Promise<void>
}