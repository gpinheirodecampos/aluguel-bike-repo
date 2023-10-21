import { User } from "../user";

export interface UserRepo {
    find(email: string): Promise<User>
    insert(user: User): Promise<number>
    remove(email: string): Promise<void>
    list(): Promise<User[]>
}
