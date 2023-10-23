import { Bike } from "@prisma/client";
import { Rent } from "@prisma/client";
import { User } from "@prisma/client";
import { RentRepo } from "./ports/rent-repo";
import { UserRepo } from "./ports/user-repo";
import { BikeRepo } from "./ports/bike-repo";
import { BikeNotFoundError } from "./errors/bike-not-found-error";
import { UnavailableBikeError } from "./errors/unavailable-bike-error";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { DuplicateUserError } from "./errors/duplicate-user-error";
import { UserHasOpenRentError } from "./errors/user-has-open-rent-error";
import { Crypt } from "./crypt";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export class App {
    crypt: Crypt = new Crypt()

    constructor(
        readonly userRepo: UserRepo,
        readonly bikeRepo: BikeRepo,
        readonly rentRepo: RentRepo
    ) {}

    async findUser(email: string): Promise<User> {
        const user = await this.userRepo.find(email)
        if (!user) throw new UserNotFoundError()
        return user
    }

    async registerUser(user: User): Promise<number> {
        if (await this.userRepo.find(user.email)) {
          throw new DuplicateUserError()
        }
        const encryptedPassword = await this.crypt.encrypt(user.password)
        user.password = encryptedPassword
        return await this.userRepo.create(user)
    }

    async authenticate(userEmail: string, password: string): Promise<boolean> {
        const user = await this.findUser(userEmail)
        return await this.crypt.compare(password, user.password)
    }

    async registerBike(bike: Bike): Promise<Bike> {
        return await this.bikeRepo.create(bike)
    }

    async removeUser(email: string): Promise<void> {
        await this.findUser(email)
        if ((await this.rentRepo.findOpenFor(email))) {
            throw new UserHasOpenRentError()
        }
        await this.userRepo.delete(email)
    }
    
    async rentBike(bikeId: number, userEmail: string): Promise<number> {
        const bike = await this.findBike(bikeId)
        if (!bike.available) {
            throw new UnavailableBikeError()
        }
        const user = await this.findUser(userEmail)
        bike.available = false
        await this.bikeRepo.update(bikeId, bike)
        // const newRent = new Rent(bike, user, new Date())
        return await this.rentRepo.create(bike, user)
    }

    async returnBike(bikeId: number, userEmail: string): Promise<number> {
        const now = new Date()
        const rent = await this.rentRepo.findOpen(bikeId, userEmail)
        if (!rent) throw new Error('Rent not found.')
        rent.end = now
        await this.rentRepo.update(rent.id, rent)
        const bike = await this.findBike(bikeId)
        bike.available = true
        await this.bikeRepo.update(bike.id, bike)
        const hours = diffHours(rent.end, rent.start)
        return hours * bike.rate
    }

    async listUsers(): Promise<User[]> {
        return await this.userRepo.list()
    }

    async listBikes(): Promise<Bike[]> {
        return await this.bikeRepo.list()
    }

    async moveBikeTo(bikeId: number, latitude: number, longitude: number) {
        const bike = await this.findBike(bikeId)
        bike.latitude = latitude
        bike.longitude = longitude
        await this.bikeRepo.update(bikeId, bike)
    }

    async findBike(bikeId: number): Promise<Bike> {
        const bike = await this.bikeRepo.find(bikeId)
        if (!bike) throw new BikeNotFoundError()
        return bike
    }
}

function diffHours(dt2: Date, dt1: Date) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(diff);
}