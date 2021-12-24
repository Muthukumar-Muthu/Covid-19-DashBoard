/*
const apiCountries = [];
const flagCountries = [];
let abbCountryMap;
const getData = async(url, array, callback) => {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    callback(json);
    afterCompletion();
};

const setMap = async() => {
    const response = await fetch(flagUrl);
    const json = await response.json();
    console.log(json);
    const abbCountryMap = new Map();
    for (const key in json) {
        abbCountryMap.set(json[key], key);
    }
    return abbCountryMap;
};

const getApiCountries = (object) => {
    for (const key in object) {
        apiCountries.push(key);
    }
};

const getFlagCountries = (object) => {
    for (const key in object) {
        flagCountries.push(object[key]);
    }
};


getData(flagUrl, flagCountries, getFlagCountries);
var count = 0;
const afterCompletion = () => {
    // console.log("in afterCompletion");
    apiCountries.forEach((apiCountryName) => {
        if (flagCountries.includes(apiCountryName) !== -1);
        // console.log(`${apiCountryName} matched ,  ${count++}`);
    });

    setMap().then((response) => {
        abbCountryMap = response;
        // console.log(abbCountryMap);
    });
    apiCountries.forEach((country) => {
        const abb = abbCountryMap.get(country);
        console.log(`${country} - ${abb}`);
        createImg(abb);
    });
};

const createImg = (abb) => {
    if (abb !== undefined) {
        const url = ` https://flagcdn.com/h240/${abb}.png`;
        const div = document.createElement("div");
        div.innerText = abb;
        const img = document.createElement("img");
        img.setAttribute("src", url);
        div.append(img);
        document.querySelector(".card-container").append(div);
    } else console.log(abb, "something went wrong");
};

/// abb - flag

const apiUrl = "https://covid-api.mmediagroup.fr/v1/cases";
let obj = {};
const getData = async(url) => {
    const response = await fetch(url);
    const json = await response.json();

    for (const key in json) {
        createImg(json[key].All.country, json[key].All.abbreviation);
    }
};

getData(apiUrl);
const createImg = (countryName, abb) => {
    if (abb !== undefined || countryName !== undefined) {
        const url = ` https://flagcdn.com/h240/${abb.toLowerCase()}.png`;
        const div = document.createElement("div");
        div.innerText = countryName;
        const img = document.createElement("img");
        img.setAttribute("src", url);
        div.append(img);
        document.querySelector(".card-container").append(div);
    } else console.log(abb, "something went wrong");
};

*/
const cardContainer = document.querySelector(".card-container");
const countryObject = {
    url: "",
    abb: "",
    country: "inida",
    confirmedCases: 55,
    deaths: 56,
    recoveredCases: 78,
};
console.log(countryObject);

const url = `https://flagcdn.com/h240/${countryObject.abb.toLowerCase()}.png`;

fetch(url)
    .catch((error) => console.log(error))

.then((response) => response.blob())
    .then((imageBlob) => {
        // Then create a local URL for that image and print it
        const imageObjectURL = URL.createObjectURL(imageBlob);
        countryObject.url = imageObjectURL;
        showCard(countryObject);
    });

function showCard(countryObject) {
    const url = `${countryObject.url}`;
    let child = `  
        <div class="img">
                <img src="${url}" alt="">
        </div>
        <div class="country">
                <span>Country</span>
                 <span>${countryObject.country}</span>
        </div>
        <div class="confirmed">
                 <span>Confirmed Cases</span>
                 <span>${countryObject.confirmedCases}</span>
        </div>
        <div class="recovered">
                 <span>Recovered Cases</span>
                 <span>${countryObject.recoveredCases}</span>
        </div>
        <div class="deaths">
                  <span>Deaths</span>
                  <span>${countryObject.deaths}</span>
        </div>
     `;

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = child;
    cardContainer.append(div);
}