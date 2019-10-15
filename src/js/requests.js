import {req} from "./main.js"

req("GET", "https://reqres.in/api/users/2").then((data) => {
    console.log("SUCCESS", data)
}).catch(err => {
    console.log("err", err)
})

req("POST", "https://reqres.in/api/register", {
    "email": "eve.holt@reqres.in",
    "password": "pistol"
}).then((data) => {
    console.log("SUCCESS", data)
}).catch(err => {
    console.log("err", err)
})