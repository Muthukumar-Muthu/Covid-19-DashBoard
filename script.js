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
const removeAll = document.querySelector(".remove-all");

// on loading all the resources, get the data from the api point to set countryList[] with the countries extracted from the json();
window.addEventListener("load", () => {
    inputField("disable");
    getCountryList(apiUrl); // to get the data from the api
    clearInput(); // clear the input field
});

// Event listner for forms (triggered on submission)
form.addEventListener("submit", (e) => {
    e.preventDefault(); //prevent the default submission
    const value = input.value;
    notify("loading...");
    console.log(`Submitted ${value}`);
    clearInput();
    inputField("disable");
    if (!checkCountry(value)) return false; //checking if the input is null or invalid country name
    getCountryDetails(apiUrl, value); //if valid country name then procceed with the value to get objects from api for particular country
});

cardContainer.addEventListener("click", remove);

removeAll.addEventListener("click", () => {
    cardContainer.innerText = "";
    recentCountryList = [];
    notify("all countries removed", "red", "auto");
    console.log(`all countries removed ${recentCountryList}`);
});

function remove(e) {
    if (e.target.classList.contains("remove")) {
        const countryObject = e.target.parentElement.parentElement;
        const countryName = countryObject.classList[1];
        countryObject.remove();
        //remove from the array
        const index = recentCountryList.indexOf(countryName);
        const removedCountry = recentCountryList.splice(index, 1);
        //notify(removed)
        notify(`${removedCountry} removed`, "red", "auto");
        //clg(removed)
        console.log(`${removedCountry} removed`);
        console.log("Modified Recent Country List", recentCountryList);
    }
}

//getting the details of the particluar country we entered
const getCountryDetails = async(url, country) => {
    console.log(`${country} in process`);
    //disable input

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
        notify(error.message, "red", "auto");
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
            notify(e.message, "red", "auto");
        })
        .finally(() => {
            inputField();
            notify("");
        });
};

const clearInput = () => {
    input.value = "";
};

//checking whether the country name entered is valid or not
function checkCountry(country) {
    let bool = false;
    if (countryList.indexOf(country) !== -1) {
        //checking whether the country name is presented in api
        bool = true;
        console.log(`${country} is valid Country name`);
    } else {
        console.log(
            "Invalid country name!" //add notification
        );

        notify("Invalid country name!", "red", "auto");
    }
    if (recentCountryList.indexOf(country) !== -1) {
        //checking whether the country name is already presented or not
        console.log(country, " presented already"); //add notification
        notify(`${country} exists already`, "red", "auto");
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
    await fetch(`https://flagcdn.com/${countryObject.abb.toLowerCase()}.svg`)
        .then((response) => response.blob())
        .then((imageBlob) => {
            // Then create a local URL for that image and print it
            const imageObjectURL = URL.createObjectURL(imageBlob);
            countryObject.url = imageObjectURL;
        })
        .catch((error) => {
            setTimeout(() => {
                notify(`flag unavaible : ${error.message}`, "red", "auto");
            }, 1000);
            countryObject.url = "";
            console.log(error); //add notification
        });
    notify(`added ${countryObject.country}`, "green", "auto");

    let child = `  
        <span class="remove-container"><i class="fas fa-trash remove"></i></span>
        <div class="img">
                <img src="${countryObject.url}" alt="">
                
        </div>
        <div class="country">
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
    div.className = `card ${countryObject.country}`;
    div.innerHTML = child;
    cardContainer.append(div);
}

//notification message display function   notify(meesage to be displayed, red green normal , auto or self)
function notify(message, color = "normal", type) {
    notification.innerText = message;
    notification.classList = "";
    notification.classList = `notification ${color}`;
    if (/^auto/i.test(type)) {
        setTimeout(() => {
            notification.innerText = "";
            notification.classList = `notification`;
            inputField();
        }, 2000);
    } else {
        notification.classList = "";
        notification.classList = `notification`;
    }
}

//enabling disabling input field because same country has been added if we enter the same country name at immediate(before the country we enter first displays) interval

function inputField(string) {
    if (/^disable/i.test(string)) {
        input.setAttribute("disabled", "true");
        console.log("input Disabled");
    } else {
        input.removeAttribute("disabled");
        console.log("input Enabled");
    }
}