import { App } from "./app";
import { Bike } from "@prisma/client";
import { Rent } from "@prisma/client";
import { User } from "@prisma/client";
import { MySqlUserRepo } from "../test/doubles/mysql-user-repo";
import { MySqlRentRepo } from "../test/doubles/mysql-rent-repo";
import { MySqlBikeRepo } from "../test/doubles/mysql-bike-repo";
const userRepo = new MySqlUserRepo();
const rentRepo = new MySqlRentRepo();
const bikeRepo = new MySqlBikeRepo();

async function main() {
    const app = new App(userRepo, bikeRepo, rentRepo)
    
    const users = gerarUsuarios()
    users.forEach(user => {
        app.registerUser(user)
    });

    const bikes = gerarBikes()
    bikes.forEach(bike => {
        app.registerBike(bike)
    });

    //app.rentBike(bikes[0].id, users[0].email)
}

function gerarUsuarios() {
    const users: User[] = [
        {name: "Gabriel", email: "gabs@mail.com", password: "123", id: 1},
        {name: "Hanyel", email: "hanyel@mail.com", password: "123", id: 2},
        {name: "Evandro", email: "evandro@mail.com", password: "123", id: 3},
        {name: "Gustavo", email: "gustavo@mail.com", password: "123", id: 4}
    ]
    return users
}

function gerarBikes() {
    const bikes: Bike[] = [
        {name: "caloi", type: "nova", bodySize: 1, maxLoad: 1, rate: 1, description: "", ratings: 1, latitude: 1, longitude: 2, id: 1, avaible: true},
        {name: "focus", type: "nova", bodySize: 1, maxLoad: 1, rate: 1, description: "", ratings: 1, latitude: 1, longitude: 2, id: 2, avaible: true},
        {name: "giant", type: "usada", bodySize: 1, maxLoad: 1, rate: 1, description: "", ratings: 1, latitude: 1, longitude: 2, id: 3, avaible: true},
        {name: "sense", type: "usada", bodySize: 1, maxLoad: 1, rate: 1, description: "", ratings: 1, latitude: 1, longitude: 2, id: 4, avaible: true}
    ]
    return bikes
}


main()








