class countryDetails {
    constructor(confirmedCases, recoveredCases, deaths, country, abb) {
        this.confirmedCases = confirmedCases;
        this.recoveredCases = recoveredCases;
        this.deaths = deaths;
        this.country = country;
        this.abb = abb;
    }
}

let countryList = [];
let recentCountryList = [];
const apiUrl = "https://covid-api.mmediagroup.fr/v1/cases";
const input = document.querySelector("input");
const dataList = document.querySelector("datalist");
const form = document.querySelector("form");
const cardContainer = document.querySelector(".card-container");

// on loading all the resources, get the data from the api point to set countryList[] with the countries extracted from the json();
window.addEventListener("load", () => {
    getData(apiUrl); // to get the data from the api
    clearInput(); // clear the input field
});

// Event listner for forms (triggered on submission)
form.addEventListener("submit", (e) => {
    e.preventDefault(); //prevent the default submission
    const value = input.value;
    console.log(`Submitted ${value}`);
    clearInput();
    if (!checkCountry(value)) return false; //checking if the input is null or invalid country name
    getCountryDetails(apiUrl, value); //if valid country name then procceed with the value to get objects from api for particular country
});

//getting the details of the particluar country we entered
const getCountryDetails = async(url, country) => {
    console.log(`${country} in process`);
    const response = await fetch(url + `?country=${country}`);
    const countryJson = await response.json();
    if (countryJson) {
        console.log(countryJson.All);
        const countryObject = getObject(
            country,
            countryJson.All,
            countryJson.All.abbreviation
        );

        //getObject()for extracting the required information from the json we receieved for the particluar country

        console.log(countryObject);
        console.log("Recent Country Added", recentCountryList);
        showCard(countryObject); //showing on the page
    }
};

//for extracting the required information from the json we receieved
const getObject = (country, countryObject, abb) => {
    return new countryDetails(
        countryObject.confirmed,
        countryObject.recovered,
        countryObject.deaths,
        country,
        abb
    );
};

/* getData() => gets the data from the api and 
sets the countryList array with the country we received from the api and
sets the options in HTML input element dynamically for showing suggestions at the bottom of the input field */
const getData = async(url) => {
    fetch(url)
        .then((response) => response.json())
        .then((response) => {
            getCountry(response); // sets the countryList array with countries we received from the api
            console.log(countryList);
            dataList.innerHTML = createOption(countryList); //sets the option with country list
        })
        .catch((e) =>
            console.log(e, e.message, "failed to connect! /\n something went wrong")
        );
};

const clearInput = () => {
    input.value = "";
};

//checking whether the country name entered is valid or not
function checkCountry(country) {
    let bool = false;
    if (countryList.indexOf(country) !== -1) {
        bool = true;
        console.log(`Country ${country} is valid Country name`);
    } else {
        console.log(
            "Invalid country name! \nChecking the spelling or some other error occured"
        );
    }
    if (recentCountryList.indexOf(country) !== -1) {
        console.log(country, "presented already");
        bool = false;
    }
    return bool;
}

//sets the countryList array with countries list from the api
const getCountry = (wholeObject) => {
    for (const key in wholeObject) {
        countryList.push(key);
    }
};

// creates option for datalist (suggestion for input field)
const createOption = (countryList) => {
    let wholeOption = "";
    countryList.forEach((country) => {
        wholeOption = wholeOption + `<option value="${country}">`;
    });

    return wholeOption;
};

function showCard(countryObject) {
    const url = `https://flagcdn.com/h240/${countryObject.abb.toLowerCase()}.png`;
    const child = `  
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
    recentCountryList.push(countryObject.country); //updated the new country added to the page
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = child;
    cardContainer.append(div);
}