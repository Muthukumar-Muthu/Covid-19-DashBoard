let countryList = [];
const input = document.querySelector("input");
const dataList = document.querySelector("datalist");
const form = document.querySelector("form");
const url = "https://covid-api.mmediagroup.fr/v1/cases";
window.addEventListener("load", () => {
    getData();
    clearInput();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;
    console.log(`Submitted ${value}`);
    if (!value || !checkCountry(value)) return false;
    getCountryDetails(value);
});

const getCountryDetails = async(country) => {
    console.log(`${country} in process`);
    const response = await fetch(url + `?country=${country}`);
    const countryJson = await response.json();
    if (countryJson) console.log(countryJson.All);
};

const getData = async() => {
    fetch(url)
        .then((response) => response.json())
        .then((response) => {
            getCountry(response);
            console.log(countryList);
            dataList.innerHTML = createOption(countryList);
        })
        .catch((e) =>
            console.log(e, e.message, "failed to connect something went wrong")
        );
};

const clearInput = () => {
    input.value = "";
};

function checkCountry(country) {
    let bool = false;
    const mapped = countryList.filter((value) => {
        if (value == country) return value;
    });
    console.log("mapped", mapped);
    mapped.forEach((value) => {
        if (value == country) {
            bool = true;
        }
    });
    bool
        ?
        console.log(`country ${country} is presented`) :
        console.log("checking the spelling or some other error occured");
    return bool;
}

const getCountry = (wholeObject) => {
    let i = 0;
    for (const key in wholeObject) {
        countryList[i++] = key;
    }
};

const createOption = (countryList) => {
    let wholeOption = "";
    countryList.forEach((country) => {
        wholeOption = wholeOption + `<option value="${country}">`;
    });

    return wholeOption;
};

class countryDetails {
    constructor(confirmedCases, recoveredCases, deaths, country) {
        this.confirmedCases = confirmedCases;
        this.recoveredCases = recoveredCases;
        this.deaths = deaths;
        this.country = country;
    }
}
const name = new countryDetails(1, 1, 1, 1);
console.log(name);