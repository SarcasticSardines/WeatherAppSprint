import { apiKey } from "./environment.js";

let searchBar = document.getElementById("searchBar");
let results = document.getElementById("results");
let fullDate = document.getElementById("fullDate");
let faveList = document.getElementById("faveList");
let dayOnly = document.getElementById("dayOnly");
let mainIcon = document.getElementById("mainIcon")
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
let iconDay1 = document.getElementById("iconDay1");
let iconDay2 = document.getElementById("iconDay2");
let iconDay3 = document.getElementById("iconDay3");
let iconDay4 = document.getElementById("iconDay4");
let iconDay5 = document.getElementById("iconDay5");
let iconDay6 = document.getElementById("iconDay6");
let d1High = document.getElementById("d1High");
let d2High = document.getElementById("d2High");
let d3High = document.getElementById("d3High");
let d4High = document.getElementById("d4High");
let d5High = document.getElementById("d5High");
let d6High = document.getElementById("d6High");
let iconNight1 = document.getElementById("iconNight1");
let iconNight2 = document.getElementById("iconNight2");
let iconNight3 = document.getElementById("iconNight3");
let iconNight4 = document.getElementById("iconNight4");
let iconNight5 = document.getElementById("iconNight5");
let iconNight6 = document.getElementById("iconNight6");
let d1Low = document.getElementById("d1Low");
let d2Low = document.getElementById("d2Low");
let d3Low = document.getElementById("d3Low");
let d4Low = document.getElementById("d4Low");
let d5Low = document.getElementById("d5Low");
let d6Low = document.getElementById("d6Low");




navigator.geolocation.getCurrentPosition(AllowAcc, DenyAcc);


let urLat;
let urLong;
let testPlace = "Stockton, CA";


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
    
    console.log(data.weather[0].icon);
    console.log(data.main.temp);
}

async function foreCast(){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${urLat}&lon=${urLong}&appid=${apiKey}&units=imperial`)
    const data = await promise.json();

    console.log(data.list[0].main.temp_max);
}

async function ourPlace(){
    const promise = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${urLat}&lon=${urLong}&limit=5&appid=${apiKey}`)
    const data = await promise.json();

    console.log(data[0].name);
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
// async function currentDate(){

// }

async function showSearch(val){
results.innerHTML = "";
if(val == "") {
    return;
}
let list = "";
const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${testPlace}&limit=5&appid=${apiKey}`)
const data = await promise.json();
(function (data){
for (i=0; i<data.length; i++){
    list += "<li>" + data[i] + "</li>"
}
results.innerHTML = "<ul>" + list + "</ul>";
return true;
}).catch(function(err){
    console.log("ERROR", err);
    return false;
})
}