class countryDetails {
    constructor(confirmedCases, recoveredCases, deaths, country, abb) {
        this.confirmedCases = confirmedCases;
        this.recoveredCases = recoveredCases;
        this.deaths = deaths;
        this.country = country;
        this.abb = abb;
        this.url = "";
    }
}

let countryList = [];
let recentCountryList = [];
const apiUrl = "https://covid-api.mmediagroup.fr/v1/cases";

const input = document.querySelector("input");
const dataList = document.querySelector("datalist");
const form = document.querySelector("form");
const cardContainer = document.querySelector(".card-container");
const notification = document.querySelector(".notification");

// on loading all the resources, get the data from the api point to set countryList[] with the countries extracted from the json();
window.addEventListener("load", () => {
    getCountryList(apiUrl); // to get the data from the api
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

    console.log(countryJson.All);
    let abb = countryJson.All.abbreviation;
    if (abb == undefined) abb = "";

    try {
        const countryObject = getObject(country, countryJson.All, abb);
        //getObject()for extracting the required information from the json we receieved for the particluar country

        console.log(countryObject);
        console.log("Recent Country Added", recentCountryList);
        showCard(countryObject); //showing on the page
    } catch (error) {
        console.log(error); //add notification
        notify(error.message);
        return;
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

/* getCountryList() => gets the data from the api and 
sets the countryList array with the country we received from the api and
sets the options in HTML input element dynamically for showing suggestions at the bottom of the input field */
const getCountryList = async(url) => {
    fetch(url)
        .then((response) => response.json())
        .then((response) => {
            getCountry(response); // sets the countryList array with countries we received from the api
            console.log(countryList);
            dataList.innerHTML = createOption(countryList); //sets the option with country list
        })
        .catch((e) => {
            console.log(e.message, "failed to connect! \nsomething went wrong"); //add notification
            notify(e.message, "red");
        });
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
            "Invalid country name! \nChecking the spelling or some other error occured" //add notification
        );

        notify(
            "Invalid country name! \nChecking the spelling or some other error occured",
            "red"
        );
    }
    if (recentCountryList.indexOf(country) !== -1) {
        console.log(country, "presented already"); //add notification
        notify(`${country}existed already`, "green");
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

async function showCard(countryObject) {
    await fetch(`https://flagcdn.com/h240/${countryObject.abb.toLowerCase()}.png`)
        .then((response) => response.blob())
        .then((imageBlob) => {
            // Then create a local URL for that image and print it
            const imageObjectURL = URL.createObjectURL(imageBlob);
            countryObject.url = imageObjectURL;
        })
        .catch((error) => {
            console.log(error); //add notification
            notify(error.message, "red");
            countryObject.url = "";
        });
    notify(`added ${countryObject.country}`, "green");
    let child = `  
        <div class="img">
                <img src="${countryObject.url}" alt="">
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

    recentCountryList.push(countryObject); //updated the new country added to the page
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = child;
    cardContainer.append(div);
}

function notify(message, type = "normal") {
    notification.innerText = message;
    notification.classList = "";
    notification.classList = `notification ${type}`;
    setTimeout(() => {
        notification.innerText = "";
    }, 2000);
}