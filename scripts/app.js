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


// let urLat;
// let urLong;
// //stores user's lat and long values if they accept geolocation
let lat;
let lon;
let testPlace = "Stockton, CA";
let locateData;
//to hold data from geosearch (of names) like lat, long, city, state, country
// let cityData;
// add event listener to display city name, state name
// let dateData;
// hold data of day of week, month, day of month(number)
let toDay;
// to store day of week from getDay
let toMonth;
//to store month from getMonth
let toDate;
//to store day of month from getDate
let currentData;
//to hold current weather data
let currentDate;
//to hold Date data type of current day
let favoriteArray = [];
//array to save favorited cities to
let userSearch = "";
//empty string input for searchbar function
let option1 = [];
let option2 = [];
let option3 = [];
let option4 = [];
let option5 = [];
//(max) limit of 5 arrays to hold+display autocomplete options for locations search in (under) searchbar
let storeMe = "";
//FOR LOCAL STORAGE



navigator.geolocation.getCurrentPosition(AllowAcc, DenyAcc);

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
    lat = position.coords.latitude;
    lon = position.coords.longitude;
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
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    const data = await promise.json();
    currentData = await data;
    currentDate = new Date(currentData.dt *1000);
    let rawDay = currentDate.getDay();
    if(rawDay == 0){
        toDay = "Sunday";
    } else if(rawDay == 1){
        toDay = "Monday";
    } else if(rawDay == 2){
        toDay = "Tuesday";
    } else if(rawDay == 3){
        toDay = "Wednesday";
    } else if(rawDay == 4){
        toDay = "Thursday";
    } else if(rawDay == 5){
        toDay = "Friday";
    } else{
        toDay = "Saturday";
    }
    console.log(toDay)

    if(dayOnly != null){
        dayOnly.innerText = toDay;
    }

    let rawMonth =  currentDate.getMonth();
    if(rawMonth == 0){
        toMonth = "January";
    } else if(rawMonth == 1){
        toMonth =  "February";
    } else if(rawMonth == 2){
        toMonth =  "March";
    } else if(rawMonth == 3){
        toMonth =  "April";
    } else if(rawMonth == 4){
        toMonth =  "May";
    } else if(rawMonth == 5){
        toMonth =  "June";
    } else if(rawMonth == 6){
        toMonth =  "July";
    } else if(rawMonth == 7){
        toMonth =  "August";
    } else if(rawMonth == 8){
        toMonth =  "September";
    } else if(rawMonth == 9){
        toMonth =  "October";
    } else if(rawMonth == 10){
        toMonth =  "November";
    } else{
        toMonth =  "December";
    }
    console.log(toMonth);

    let toDate = currentDate.getDate();
    console.log(toDate);

    fullDate.innerText = toDay + ", " + toMonth + " " + toDate;

    // mainIcon.src= currentData.weather[0].icon
    //insert icon replacement code here

    if(currentTemp != null){
    currentTemp.innerText = Math.round(currentData.main.temp) + "°";
    }

    console.log(data.weather[0].icon);
    // console.log(data);
}

async function foreCast(){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    const data = await promise.json();

    console.log(data.list);
    console.log(data.list[0].weather[0].icon)
}

async function ourPlace(){
    const promise = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`)
    const data = await promise.json();

    console.log(data[0]);
}

async function citySearch(){
    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${testPlace}840&limit=5&appid=${apiKey}`)
    const data = await promise.json();

    console.log(data);
    //returns Array of 5 (data[dayyouneed(0-4)].country and . state and . name and .lat and .lon)
}





// fave.addEventListener("click", function()){
//     //arrayname.push(input.value)
//     //localStorage.setItem('names', JSON.stringify(arrayname))
// }

// async function showSearch(val){
// results.innerHTML = "";
// if(val == "") {
//     return;
// }
// let list = "";
// const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${testPlace}&limit=5&appid=${apiKey}`)
// const data = await promise.json();
// (function (data){
// for (i=0; i<data.length; i++){
//     list += "<li>" + data[i] + "</li>"
// }
// results.innerHTML = "<ul>" + list + "</ul>";
// return true;
// }).catch(function(err){
//     console.log("ERROR", err);
//     return false;
// })
// }


// searchBar.addEventListener("keypress", function(e){
//     if (event.key === "Enter") {
//         userSearch = searchBar.value;
//         searchFill();
//     }
// });

// async function searchFill(){
//     if(userSearch != ""){
//     const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=5&appid=${apiKey}`)
//     const data = await promise.json();
//     locateData = await data;
//     if (data[0]) {
//         option1 = [data[0].name + ", " + data[0].state + ", " + data[0].country]
//     }
//     if (data[1]) {
//         option1 = [data[1].name + ", " + data[1].state + ", " + data[1].country]
//     }
//     if (data[2]) {
//         option1 = [data[2].name + ", " + data[2].state + ", " + data[2].country]
//     }
//     if (data[3]) {
//         option1 = [data[3].name + ", " + data[3].state + ", " + data[3].country]
//     }
//     if (data[4]) {
//         option1 = [data[4].name + ", " + data[4].state + ", " + data[4].country]
//     }
//     cityOptions();
// }else{
//     results.innerHTML = "";
// };
// }

// function cityOptions(){
//     results.innerHTML = "";

//     let loca1 = document.createElement("p");
//     loca1.textContent = option1;
//     loca1.className = "txtC"
//     loca1.addEventListener("click", function(e){
//         lat = locateData[0].lat;
//         lon = locateData[0].lon;
//         storeMe = locateData[0].name + ", " + locateData[0].state + ", " + locateData[0].country;
        
//         results = "";
//         searchBar.innerHTML = "";
//     });
//     let box = document.createElement("div");
//     box.className = "searchOptions";
//     box.appendChild(loca1);
// }