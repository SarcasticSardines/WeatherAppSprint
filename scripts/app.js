import { apiKey } from "./environment.js";

let searchBar = document.getElementById("searchBar");
let fullDate = document.getElementById("fullDate");
let faveList = document.getElementById("faveList");
let dayOnly = document.getElementById("dayOnly");
let currentTemp = document.getElementById("currentTemp");
let bigCity = document.getElementById("bigCity");
let bigState = document.getElementById("bigState");
let maxNmin = document.getElementById("maxNmin");
let fave = document.getElementById("fave");
let dayOne = document.getElementById("dayOne");
let dayTwo = document.getElementById("dayTwo");
let dayThree = document.getElementById("dayThree");
let dayFour = document.getElementById("dayFour");
let dayFive = document.getElementById("dayFive");
let daySix = document.getElementById("daySix");

navigator.geolocation.getCurrentPosition(AllowAcc, DenyAcc);


let urLat;
let urLong;
let testPlace = "Sacramento";


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
    foreCast();
    ourPlace();
    citySearch();
}

function DenyAcc(error){
    console.log("ERROR")
    console.log(randomLat() + ", " + randomLong())
}

async function Current(){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${urLat}&lon=${urLong}&appid=${apiKey}&units=imperial`)
    const data = await promise.json();
    
    console.log(data);
}

async function foreCast(){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${urLat}&lon=${urLong}&appid=${apiKey}&units=imperial`)
    const data = await promise.json();

    console.log(data);
}

async function ourPlace(){
    const promise = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${urLat}&lon=${urLong}&limit=5&appid=${apiKey}`)
    const data = await promise.json();

    console.log(data);
}

async function citySearch(){
    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${testPlace}840&limit=5&appid=${apiKey}`)
    const data = await promise.json();

    console.log(data);
}

// fave.addEventListener("click", function()){
//     //arrayname.push(input.value)
//     //localStorage.setItem('names', JSON.stringify(arrayname))
// }