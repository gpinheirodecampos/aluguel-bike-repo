import { Bike } from "../bike"

export interface BikeRepo {
    find(id: number): Promise<Boolean>
    insert(bike: Bike): Promise<Boolean>
    remove(id: number): Promise<Boolean>
    update(id: number, bike: Bike): Promise<Boolean>
    list(): Promise<void>
}