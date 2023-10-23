import { User } from "@prisma/client"

export interface UserRepo {
    find(email: string): Promise<User>
    create(user: User): Promise<number>
    delete(email: string): Promise<Boolean>
    list(): Promise<User[]>
}
