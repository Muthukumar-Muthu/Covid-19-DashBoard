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
*/
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