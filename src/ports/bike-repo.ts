import { Bike } from "@prisma/client"

export interface BikeRepo {
    find(id: number): Promise<Bike>
    create(bike: Bike): Promise<Boolean>
    delete(id: number): Promise<Boolean>
    update(id: number, bike: Bike): Promise<Boolean>
    list(): Promise<Bike[]>
}