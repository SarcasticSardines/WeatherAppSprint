import { apiKey } from "./environment.js";

navigator.geolocation.getCurrentPosition(AllowAcc, DenyAcc);

// function userLocation(){
//     fetch()
// }

function AllowAcc(position){
    console.log("Our latitude and longitude: " + position.coords.latitude + ", " + position.coords.longitude)
}

function DenyAcc(error){
    console.log(ERROR)
}
