import { apiKey } from "./environment.js";


navigator.geolocation.getCurrentPosition(AllowAcc, DenyAcc);


let urLat;
let urLong;
// function userLocation(){
//     fetch()
// }
function randomLat(){
    let latnum = (Math.random()*180).toFixed(3);
    let NegPos = Math.floor(Math.random());
    if(NegPos == 0){
        latnum = latnum *-1;
    }
    return latnum
}
randomLat();

function randomLong(){
    let longnum = (Math.random()*180).toFixed(3);
    let PosNeg = Math.floor(Math.random());
    if(PosNeg == 0){
        longnum = longnum *-1;
    }
    return longnum
}
randomLong();

function AllowAcc(position){
    console.log("Our latitude and longitude: " + position.coords.latitude + ", " + position.coords.longitude)
    urLat = position.coords.latitude;
    urLong = position.coords.longitude;
    Current();
}

function DenyAcc(error){
    console.log("ERROR")
    console.log(randomLat() + ", " + randomLong())
}

async function Current(){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${urLat}&lon=${urLong}&appid=eb8ba7f6132adde747cc3daed638306b&units=imperial`)
    const data = await promise.json();
    
    console.log(data)
}

